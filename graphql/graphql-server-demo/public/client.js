async function request(query, variables) {
  const payload = {
    query,
  };
  if (variables) {
    payload.variables = variables;
  }
  const body = JSON.stringify(payload);

  return fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body,
    })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
}

async function fetchStringQL() {
  const query = `{
    hello
  }`;

  return request(query);
}

async function fetchQuoteOfTheDay() {
  const query = `{
    quoteOfTheDay
  }`;

  return request(query);
}

async function fetchRollDice() {
  const query = `query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
  }`;

  const dice = 3;
  const sides = 6;
  const variables = {
    dice,
    sides
  };

  return request(query, variables);
}

async function fetchDie() {
  const query = `{
    getDie(numSides: 6) {
      rollOnce
      roll(numRolls: 3)
      rollFoobar
    }
  }`;

  return request(query);
}

async function postMessage() {
  const query = `mutation CreateMessage($input: MessageInput) {
    createMessage(input: $input) {
      id
    }
  }`;

  const variables = {
    input: {
      author: 'Jovi',
      content: 'Nothing want to be quiet.',
    },
  };

  return request(query, variables);
}

Promise.all([
  fetchStringQL(),
  fetchQuoteOfTheDay(),
  fetchRollDice(),
  fetchDie(),
  postMessage(),
]);
