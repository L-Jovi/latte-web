import Component from './component.js';
const roots = new WeakMap();
function mount(vnode) {
  const { type, props } = vnode;
  if (typeof type === 'function') {
    if (!(type.prototype instanceof Component)) return mount(type(props));
    const instance = new type(props);
    let child = mount(instance.render());
    instance.update = (previous) => {
      const next = mount(instance.render());
      child.dom.replaceWith(next.dom);
      child.unmount();
      child = next;
      child.commit();
      instance.componentDidUpdate?.(instance.props, previous);
    };
    return {
      get dom() {
        return child.dom;
      },
      commit() {
        child.commit();
        instance.componentDidMount?.();
      },
      unmount() {
        instance.update = null;
        instance.componentWillUnmount?.();
        child.unmount();
      },
    };
  }
  const dom =
    type === 'TEXT'
      ? document.createTextNode(props.nodeValue)
      : document.createElement(type);
  if (type !== 'TEXT')
    for (const [name, value] of Object.entries(props)) {
      if (name === 'children' || name === 'key') continue;
      if (name.startsWith('on'))
        dom.addEventListener(name.slice(2).toLowerCase(), value);
      else if (name === 'style') Object.assign(dom.style, value);
      else if (name === 'className') dom.className = value;
      else if (name === 'value' || name === 'checked') dom[name] = value;
      else if (value != null && value !== false)
        dom.setAttribute(name, value === true ? '' : String(value));
    }
  const children = (props.children || []).map(mount);
  for (const child of children) dom.appendChild(child.dom);
  return {
    dom,
    commit() {
      children.forEach((child) => child.commit());
    },
    unmount() {
      children.forEach((child) => child.unmount());
    },
  };
}
export function render(vnode, container) {
  roots.get(container)?.unmount();
  if (vnode == null) {
    container.replaceChildren();
    roots.delete(container);
    return;
  }
  const root = mount(vnode);
  container.replaceChildren(root.dom);
  roots.set(container, root);
  root.commit();
}
export default { render };
