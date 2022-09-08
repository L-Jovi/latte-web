const express = require('express');
const cors = require('cors');
const {
  graphqlHTTP,
} = require('express-graphql');
const {
  buildSchema,
} = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Hello {
    foo: String
    bar: [String]!
  }

  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    rollFoobar: String!
    roll(numRolls: Int!): [Int]
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }

  type Query {
    hello: Hello

    quoteOfTheDay: String

    rollDice(numDice: Int!, numSides: Int): [Int]

    getDie(numSides: Int): RandomDie

    getMessage(id: ID!): Message
  }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollFoobar() {
    return 'foobar';
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

class Hello {
  constructor() {
    this.foo = 'Hello world!';
    this.bar = ['bar', 'baz'];
  }
}

const fakeDatabase = {};

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    const h = new Hello();
    return h;
  },

  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },

  rollDice: ({numDice, numSides}) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },

  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  },

  getMessage: ({id}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },

  createMessage: ({input}) => {
    const id = require('crypto').randomBytes(10).toString('hex');
    fakeDatabase[id] = input;
    console.log('createMessage: ', fakeDatabase);
    return new Message(id, input);
  },

  updateMessage: ({id, input}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

const loggingMiddleware = (req, res, next) => {
  console.log('ip: ', req.ip);
  next();
}

const app = express();
app.use(cors());
app.use(loggingMiddleware);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
