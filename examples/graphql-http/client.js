// The page shows one language at a time (assets/language.js). Until the first
// query is sent, the answer box says Ready in the language shown.
const output = document.querySelector('pre');
let asked = false;
function ready() {
  if (!asked)
    output.textContent =
      document.documentElement.dataset.language === 'zh' ? '就绪' : 'Ready';
}
ready();
document.addEventListener('languagechange', ready);
// The top bar's language switch is a button too, so take the one after the heading.
document.querySelector('h1 ~ button').onclick = async () => {
  asked = true;
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
