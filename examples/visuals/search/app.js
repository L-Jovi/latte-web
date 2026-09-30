const input = document.querySelector('input'),
  list = document.querySelector('ul'),
  output = document.querySelector('output');
let topics = [],
  matches = [],
  selected = -1;
try {
  const response = await fetch('./topics.json');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  topics = await response.json();
} catch (error) {
  output.textContent = 'Could not load topics: ' + error.message;
}
function close() {
  list.hidden = true;
  input.setAttribute('aria-expanded', 'false');
  input.removeAttribute('aria-activedescendant');
}
function choose(i) {
  input.value = matches[i];
  output.textContent = 'Selected: ' + matches[i];
  close();
}
function highlight() {
  [...list.children].forEach((node, i) =>
    node.setAttribute('aria-selected', String(i === selected)),
  );
  if (selected >= 0)
    input.setAttribute('aria-activedescendant', 'topic-' + selected);
  else input.removeAttribute('aria-activedescendant');
}
input.oninput = () => {
  selected = -1;
  matches = input.value.trim()
    ? topics.filter((topic) =>
        topic.toLowerCase().includes(input.value.trim().toLowerCase()),
      )
    : [];
  list.replaceChildren(
    ...matches.map((topic, i) => {
      const li = document.createElement('li');
      li.role = 'option';
      li.id = 'topic-' + i;
      li.textContent = topic;
      li.onpointerdown = (event) => event.preventDefault();
      li.onclick = () => choose(i);
      return li;
    }),
  );
  list.hidden = matches.length === 0;
  input.setAttribute('aria-expanded', String(matches.length > 0));
  highlight();
  output.textContent =
    matches.length + (matches.length === 1 ? ' suggestion' : ' suggestions');
};
input.onkeydown = (event) => {
  if (event.key === 'Escape') {
    close();
    return;
  }
  if (list.hidden) return;
  if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault();
    selected =
      (selected + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) %
      matches.length;
    highlight();
  } else if (event.key === 'Enter' && selected >= 0) {
    event.preventDefault();
    choose(selected);
  }
};
input.onblur = close;
