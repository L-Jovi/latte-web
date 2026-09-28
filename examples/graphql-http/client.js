document.querySelector('button').onclick = async () => {
  const output = document.querySelector('pre');
  try {
    const response = await fetch('http://127.0.0.1:4001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: document.querySelector('textarea').value }),
    });
    output.textContent = JSON.stringify(await response.json(), null, 2);
  } catch (error) {
    output.textContent = error.message;
  }
};
