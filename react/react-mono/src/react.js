import Component from './component'


const TEXT_ELEMENT = "TEXT"


function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value })
}


function $createElement(type, _props, ...children) {
  const props = Object.assign({}, _props)

  const hasChildren = children.length > 0
  const mergedChildren = hasChildren ? [].concat(...children) : []

  props.children = mergedChildren
    .filter(c => c != null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)))
  return { type, props }
}


function createElement(el, props, ...children) {
  return $createElement(el, props || {}, children)
}


const React = {
  createElement,
  Component,
}


export default React
