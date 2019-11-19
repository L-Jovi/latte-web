import ReactDOM from "./react-dom"


function reRender(rootReactElement, rootDOMElement) {
  while (rootDOMElement.hasChildNodes()) {
    rootDOMElement.removeChild(rootDOMElement.lastChild)
  }
  ReactDOM.render(rootReactElement, rootDOMElement)
}


class Component {
  constructor(props) {
    this.props = props
    this.state = this.state || {}
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    reRender(window.vdom, window.el)
  }
}


export default Component
