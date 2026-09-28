import Component from './component.js';
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children
        .flat(Infinity)
        .filter((child) => child != null && typeof child !== 'boolean')
        .map((child) =>
          typeof child === 'object'
            ? child
            : {
                type: 'TEXT',
                props: { nodeValue: String(child), children: [] },
              },
        ),
    },
  };
}
export default { createElement, Component };
