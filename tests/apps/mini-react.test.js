import { it, expect, afterEach } from 'vitest';
import React from '../../mechanisms/mini-react/src/react.js';
import { render } from '../../mechanisms/mini-react/src/react-dom.js';
const h = React.createElement;
let container;
afterEach(() => {
  if (container) {
    render(null, container);
    container.remove();
  }
});
it('keeps instances independent, commits mount after insertion and cleans up', () => {
  let mounted = 0,
    unmounted = 0;
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
    }
    componentDidMount() {
      expect(container.querySelectorAll('button').length).toBe(2);
      mounted++;
    }
    componentWillUnmount() {
      unmounted++;
    }
    render() {
      return h(
        'button',
        {
          onClick: () => this.setState((state) => ({ count: state.count + 1 })),
        },
        this.props.name + this.state.count,
      );
    }
  }
  container = document.body.appendChild(document.createElement('div'));
  render(
    h('section', {}, h(Counter, { name: 'a' }), h(Counter, { name: 'b' })),
    container,
  );
  container.querySelector('button').click();
  container.querySelector('button').click();
  expect(
    [...container.querySelectorAll('button')].map((node) => node.textContent),
  ).toEqual(['a2', 'b0']);
  expect(mounted).toBe(2);
  render(null, container);
  expect(unmounted).toBe(2);
  expect(container.childNodes.length).toBe(0);
});
