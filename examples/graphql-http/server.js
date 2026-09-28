import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { buildSchema, GraphQLError } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/http';
export function createBasicServer() {
  const schema = buildSchema(`
    input MessageInput {content:String! author:String!}
    type Message {id:ID! content:String! author:String!}
    type Hello {foo:String! bar:[String!]!}
    type RandomDie {numSides:Int! rollOnce:Int! rollFoobar:String! roll(numRolls:Int!):[Int!]!}
    type Query {hello:Hello! quoteOfTheDay:String! rollDice(numDice:Int!,numSides:Int=6):[Int!]! getDie(numSides:Int=6):RandomDie! getMessage(id:ID!):Message}
    type Mutation {createMessage(input:MessageInput!):Message! updateMessage(id:ID!,input:MessageInput!):Message!}
  `);
  const messages = new Map();
  function bounded(value, max) {
    if (!Number.isInteger(value) || value < 1 || value > max)
      throw new GraphQLError(`Expected an integer from 1 to ${max}`);
    return value;
  }
  class RandomDie {
    constructor(sides) {
      this.numSides = bounded(sides, 1000);
    }
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
    rollFoobar() {
      return 'foobar';
    }
    roll({ numRolls }) {
      return Array.from({ length: bounded(numRolls, 100) }, () =>
        this.rollOnce(),
      );
    }
  }
  function input(value) {
    if (
      !value.content.trim() ||
      value.content.length > 1000 ||
      !value.author.trim() ||
      value.author.length > 100
    )
      throw new GraphQLError('Use a short, nonempty message and author');
    return value;
  }
  const rootValue = {
    hello: () => ({ foo: 'Hello world!', bar: ['bar', 'baz'] }),
    quoteOfTheDay: () => 'Keep the mechanism visible',
    rollDice: ({ numDice, numSides }) =>
      new RandomDie(numSides).roll({ numRolls: numDice }),
    getDie: ({ numSides }) => new RandomDie(numSides),
    getMessage: ({ id }) => messages.get(id),
    createMessage: ({ input: value }) => {
      if (messages.size >= 100)
        throw new GraphQLError('Restart this in-memory demo to clear messages');
      const message = { id: randomUUID(), ...input(value) };
      messages.set(message.id, message);
      return message;
    },
    updateMessage: ({ id, input: value }) => {
      if (!messages.has(id)) throw new GraphQLError('Message not found');
      const message = { id, ...input(value) };
      messages.set(id, message);
      return message;
    },
  };
  const handler = createHandler({ schema, rootValue });
  return createServer((req, res) => {
    if (
      ['http://127.0.0.1:4173', 'http://localhost:4173'].includes(
        req.headers.origin,
      )
    )
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204).end();
      return;
    }
    if (new URL(req.url, 'http://localhost').pathname === '/graphql')
      handler(req, res);
    else res.writeHead(404).end();
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  createBasicServer().listen(4001, '127.0.0.1', () =>
    console.log('Basic GraphQL: http://127.0.0.1:4001/graphql'),
  );
