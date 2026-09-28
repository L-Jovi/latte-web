import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
import { application, database } from './fixture.ts';
import { openDatabase } from '../../examples/graphql/server/src/db.ts';
import { seed } from '../../examples/graphql/server/prisma/seed.ts';
import { createBasicServer } from '../../examples/graphql-http/server.js';
async function request(url: string, query: string, variables = {}, token = '') {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}
test('schema and class resolvers, mutation storage and bounded input', async () => {
  const server = createBasicServer();
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address() as { port: number };
  const url = `http://127.0.0.1:${address.port}/graphql`;
  try {
    const result = await request(
      url,
      '{hello{foo bar} getDie(numSides:1){roll(numRolls:3)}}',
    );
    assert.equal(result.data.hello.foo, 'Hello world!');
    assert.deepEqual(result.data.getDie.roll, [1, 1, 1]);
    assert.match(
      (await request(url, '{rollDice(numDice:101)}')).errors[0].message,
      /integer/,
    );
    const created = await request(
      url,
      'mutation{createMessage(input:{author:"Reader",content:"First"}){id}}',
    );
    const updated = await request(
      url,
      'mutation($id:ID!){updateMessage(id:$id,input:{author:"Reader",content:"Second"}){content}}',
      { id: created.data.createMessage.id },
    );
    assert.equal(updated.data.updateMessage.content, 'Second');
    assert.equal(
      (
        await request(url, 'query($id:ID!){getMessage(id:$id){content}}', {
          id: created.data.createMessage.id,
        })
      ).data.getMessage.content,
      'Second',
    );
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
test('fresh database migration and seed are repeatable', async () => {
  for (let i = 0; i < 2; i++) {
    const data = await database();
    const db = openDatabase(data.databaseUrl);
    try {
      await seed(data.databaseUrl);
      assert.equal(await db.user.count(), 1);
      assert.equal(await db.link.count(), 4);
      assert.equal(await db.vote.count(), 0);
    } finally {
      await db.$disconnect();
      await data.remove();
    }
  }
});
test('auth, stable pagination, duplicate votes and awaited subscriptions', async () => {
  const app = await application();
  const query = (q: string, v = {}, token = '') =>
    request(app.url, q, v, token);
  let socket: ReturnType<typeof createClient> | undefined;
  let stop: (() => void) | undefined;
  try {
    assert.equal(
      (
        await query(
          'mutation{post(url:"https://example.test",description:"Denied"){id}}',
        )
      ).errors[0].extensions.code,
      'UNAUTHENTICATED',
    );
    assert.equal(
      (await query('mutation{vote(linkId:"seed-link-0"){id}}')).errors[0]
        .extensions.code,
      'UNAUTHENTICATED',
    );
    assert.equal(
      (await query('{info}', {}, 'invalid')).errors[0].extensions.code,
      'UNAUTHENTICATED',
    );
    const login = await query(
      'mutation{login(email:"reader@example.test",password:"Learning-only-123!"){token}}',
    );
    const token = login.data.login.token;
    const signup = await query(
      'mutation{signup(email:"second@example.test",password:"Another-test-123!",name:"Second"){token user{name}}}',
    );
    assert.equal(signup.data.signup.user.name, 'Second');
    const first = await query('{feed(take:2,skip:0){count links{id}}}');
    const second = await query('{feed(take:2,skip:2){links{id}}}');
    assert.equal(first.data.feed.count, 4);
    assert.equal(
      new Set(
        [...first.data.feed.links, ...second.data.feed.links].map(
          (item) => item.id,
        ),
      ).size,
      4,
    );
    assert.ok((await query('{feed(take:0){count}}')).errors);
    assert.equal(
      (await query('{feed(filter:"GraphQL"){count}}')).data.feed.count,
      1,
    );
    socket = createClient({
      url: app.url.replace('http', 'ws'),
      webSocketImpl: WebSocket,
      connectionParams: { Authorization: 'Bearer ' + token },
      retryAttempts: 0,
    });
    const event = new Promise<any>((resolve, reject) => {
      stop = socket!.subscribe(
        { query: 'subscription{newVote{id link{id} user{id}}}' },
        { next: resolve, error: reject, complete() {} },
      );
    });
    // Wait for the resolver's actual listener before publishing, not for an arbitrary timeout.
    for (let i = 0; app.events.listenerCount('VOTE') === 0 && i < 100; i++)
      await delay(10);
    assert.equal(app.events.listenerCount('VOTE'), 1);
    const votes = await Promise.all([
      query('mutation{vote(linkId:"seed-link-0"){id}}', {}, token),
      query('mutation{vote(linkId:"seed-link-0"){id}}', {}, token),
    ]);
    assert.equal(votes.filter((result) => result.data?.vote).length, 1);
    assert.equal(
      votes.filter(
        (result) => result.errors?.[0].extensions.code === 'ALREADY_VOTED',
      ).length,
      1,
    );
    const payload = await Promise.race([
      event,
      delay(3000).then(() => {
        throw new Error('Subscription did not deliver');
      }),
    ]);
    assert.equal(payload.data.newVote.link.id, 'seed-link-0');
    assert.ok(
      await app.db.vote.findUnique({
        where: { id: Number(payload.data.newVote.id) },
      }),
    );
    stop();
    await socket.dispose();
    socket = undefined;
    const badSocket = createClient({
      url: app.url.replace('http', 'ws'),
      webSocketImpl: WebSocket,
      retryAttempts: 0,
    });
    try {
      const rejection = await new Promise<any>((resolve) =>
        badSocket.subscribe(
          { query: 'subscription{newLink{id}}' },
          {
            next() {
              resolve('unexpected');
            },
            error: resolve,
            complete() {},
          },
        ),
      );
      assert.equal(rejection.code, 4403);
    } finally {
      await badSocket.dispose();
    }
    assert.ok(
      (
        await query(
          'mutation{post(url:"javascript:alert(1)",description:"Rejected"){id}}',
          {},
          token,
        )
      ).errors,
    );
    assert.equal(
      (
        await query(
          'mutation{post(url:"https://example.test/resource",description:"A real row"){description}}',
          {},
          token,
        )
      ).data.post.description,
      'A real row',
    );
  } finally {
    stop?.();
    await socket?.dispose();
    await app.dispose();
  }
});
