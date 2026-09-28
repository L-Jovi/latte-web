import { createServer } from 'node:http';
import { EventEmitter } from 'node:events';
import { readFile } from 'node:fs/promises';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/use/ws';
import { WebSocketServer, WebSocket } from 'ws';
import { openDatabase } from './db.ts';
import type { Link, Vote } from '../generated/prisma/client.ts';
type Context = { userId: string | null };
function fail(message: string, code = 'BAD_USER_INPUT'): never {
  throw new GraphQLError(message, { extensions: { code } });
}
function requireUser(context: Context) {
  return context.userId || fail('Log in first', 'UNAUTHENTICATED');
}
function text(value: string, max: number) {
  const result = value.trim();
  if (!result || result.length > max) fail(`Use 1–${max} characters`);
  return result;
}
export async function createApplication({
  databaseUrl,
  secret,
  port = 4000,
}: {
  databaseUrl: string;
  secret: string;
  port?: number;
}) {
  if (secret.length < 32)
    throw new Error('APP_SECRET must contain at least 32 characters');
  const db = openDatabase(databaseUrl);
  const events = new EventEmitter();
  const pubsub = new PubSub({ eventEmitter: events });
  async function authorization(header: unknown): Promise<Context> {
    if (header === undefined || header === '') return { userId: null };
    if (typeof header !== 'string' || !header.startsWith('Bearer '))
      fail('Invalid authorization', 'UNAUTHENTICATED');
    let claims: jwt.JwtPayload;
    try {
      const parsed = jwt.verify(header.slice(7), secret, {
        algorithms: ['HS256'],
        issuer: 'latte-web',
        audience: 'latte-web-demo',
      });
      if (typeof parsed === 'string') throw new Error();
      claims = parsed;
    } catch {
      fail('Invalid or expired token', 'UNAUTHENTICATED');
    }
    if (
      typeof claims.sub !== 'string' ||
      !(await db.user.findUnique({ where: { id: claims.sub } }))
    )
      fail('Unknown user', 'UNAUTHENTICATED');
    return { userId: claims.sub };
  }
  function auth(user: { id: string; name: string }) {
    return {
      user,
      token: jwt.sign({}, secret, {
        subject: user.id,
        expiresIn: '1h',
        issuer: 'latte-web',
        audience: 'latte-web-demo',
        algorithm: 'HS256',
      }),
    };
  }
  const resolvers = {
    Query: {
      info: () => 'A local learning feed',
      feed: async (
        _unknown: unknown,
        {
          filter,
          skip,
          take,
          orderBy,
        }: {
          filter: string;
          skip: number;
          take: number;
          orderBy: 'asc' | 'desc';
        },
      ) => {
        if (skip < 0 || take < 1 || take > 50 || filter.length > 200)
          fail('Use skip ≥ 0, take 1–50 and a short filter');
        const where = {
          OR: [
            { description: { contains: filter } },
            { url: { contains: filter } },
          ],
        };
        const [links, count] = await db.$transaction([
          db.link.findMany({
            where,
            skip,
            take,
            orderBy: [{ createdAt: orderBy }, { id: orderBy }],
          }),
          db.link.count({ where }),
        ]);
        return { links, count };
      },
    },
    Mutation: {
      signup: async (
        _unknown: unknown,
        {
          email,
          password,
          name,
        }: { email: string; password: string; name: string },
      ) => {
        email = text(email, 254).toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          fail('Use a valid email');
        if (password.length < 12 || Buffer.byteLength(password) > 72)
          fail(
            'Use a password of at least 12 characters and at most 72 UTF-8 bytes',
          );
        try {
          return auth(
            await db.user.create({
              data: {
                email,
                name: text(name, 80),
                password: await bcrypt.hash(password, 10),
              },
            }),
          );
        } catch (error) {
          if ((error as { code?: string }).code === 'P2002')
            fail('Email already registered');
          throw error;
        }
      },
      login: async (
        _unknown: unknown,
        { email, password }: { email: string; password: string },
      ) => {
        if (email.length > 254 || Buffer.byteLength(password) > 72)
          fail('Invalid email or password', 'UNAUTHENTICATED');
        const user = await db.user.findUnique({
          where: { email: email.trim().toLowerCase() },
        });
        if (!user || !(await bcrypt.compare(password, user.password)))
          fail('Invalid email or password', 'UNAUTHENTICATED');
        return auth(user);
      },
      post: async (
        _unknown: unknown,
        { url, description }: { url: string; description: string },
        context: Context,
      ) => {
        const postedById = requireUser(context);
        url = text(url, 2048);
        try {
          if (!['http:', 'https:'].includes(new URL(url).protocol))
            throw new Error();
        } catch {
          fail('Use an http or https URL');
        }
        const link = await db.link.create({
          data: { url, description: text(description, 200), postedById },
        });
        // Publication follows the awaited database write; subscribers receive a real row, never a Promise.
        await pubsub.publish('LINK', { newLink: link });
        return link;
      },
      vote: async (
        _unknown: unknown,
        { linkId }: { linkId: string },
        context: Context,
      ) => {
        const userId = requireUser(context);
        if (!(await db.link.findUnique({ where: { id: linkId } })))
          fail('Link not found');
        try {
          const vote = await db.vote.create({ data: { linkId, userId } });
          await pubsub.publish('VOTE', { newVote: vote });
          return vote;
        } catch (error) {
          if ((error as { code?: string }).code === 'P2002')
            fail('Already voted', 'ALREADY_VOTED');
          throw error;
        }
      },
    },
    Subscription: {
      newLink: {
        subscribe: (_unknown: unknown, _args: unknown, context: Context) => {
          requireUser(context);
          return pubsub.asyncIterableIterator('LINK');
        },
      },
      newVote: {
        subscribe: (_unknown: unknown, _args: unknown, context: Context) => {
          requireUser(context);
          return pubsub.asyncIterableIterator('VOTE');
        },
      },
    },
    Link: {
      createdAt: (link: Link) => link.createdAt.toISOString(),
      postedBy: (link: Link) =>
        db.user.findUniqueOrThrow({ where: { id: link.postedById } }),
      votes: (link: Link) => db.vote.findMany({ where: { linkId: link.id } }),
    },
    Vote: {
      link: (vote: Vote) =>
        db.link.findUniqueOrThrow({ where: { id: vote.linkId } }),
      user: (vote: Vote) =>
        db.user.findUniqueOrThrow({ where: { id: vote.userId } }),
    },
  };
  const schema = makeExecutableSchema({
    typeDefs: await readFile(
      new URL('schema.graphql', import.meta.url),
      'utf8',
    ),
    resolvers,
  });
  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const expirations = new Map<WebSocket, NodeJS.Timeout>();
  const sockets = useServer(
    {
      schema,
      context: async (context) =>
        authorization(context.connectionParams?.Authorization),
      onConnect: async (context) => {
        try {
          requireUser(
            await authorization(context.connectionParams?.Authorization),
          );
        } catch {
          return false;
        }
        const claims = jwt.decode(
          String(context.connectionParams?.Authorization).slice(7),
        ) as jwt.JwtPayload;
        expirations.set(
          context.extra.socket,
          setTimeout(
            () => context.extra.socket.close(4403, 'Session expired'),
            Math.max(0, claims.exp! * 1000 - Date.now()),
          ),
        );
      },
      onDisconnect: (context) => {
        clearTimeout(expirations.get(context.extra.socket));
        expirations.delete(context.extra.socket);
      },
    },
    wsServer,
  );
  const apollo = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              for (const timer of expirations.values()) clearTimeout(timer);
              await sockets.dispose();
            },
          };
        },
      },
    ],
  });
  await apollo.start();
  app.use(
    '/graphql',
    cors({ origin: ['http://127.0.0.1:4173', 'http://localhost:4173'] }),
    express.json({ limit: '32kb' }),
    expressMiddleware(apollo, {
      context: async ({ req }) => authorization(req.headers.authorization),
    }),
  );
  await new Promise<void>((resolve, reject) => {
    httpServer.once('error', reject);
    httpServer.listen(port, '127.0.0.1', resolve);
  });
  const address = httpServer.address();
  if (!address || typeof address === 'string')
    throw new Error('Missing listener');
  return {
    url: `http://127.0.0.1:${address.port}/graphql`,
    db,
    events,
    async close() {
      await apollo.stop();
      await db.$disconnect();
    },
  };
}
