import Component from "./component"


const isListener = propName => propName.startsWith("on")
const isAttribute = propName => !isListener(propName) && propName != "children"
const isClass = function(type) {
  return type.prototype instanceof Component
}


function getDOM(type, props, el) {
  const isTextElement = type === "TEXT"

  if (isTextElement) {
    return document.createTextNode("")

  } else if (isClass(type)) {
    if (!type.instance) {
      type.instance = new type(props)
    }

    return ReactDOM.render(
      type.instance.render(props, type.instance.state || {}),
      el
    )
  }

  return document.createElement(type)
}


const ReactDOM = {
  render(vdom, el) {
    if (!window.vdom) {
      window.vdom = vdom
    }
    if (!window.el) {
      window.el = el
    }

    const { type, props } = vdom
    const dom = getDOM(type, props, el)

    Object.keys(props)
      .filter(isListener)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2)
        dom.addEventListener(eventType, props[name])
      })

    Object.keys(props)
      .filter(isAttribute)
      .forEach(name => {
        if (name === "className") {
          dom.class = props[name]
        } else {
          dom[name] = props[name]
        }
      })

    const childElements = props.children || []
    childElements.forEach(childElement => ReactDOM.render(childElement, dom))

    el.appendChild(dom)

    return dom
  }
}


export default ReactDOM
