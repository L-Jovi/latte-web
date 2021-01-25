import ReactDOM from "./react-dom"


const REPLACE = 0   // replace
const ORDER = 1     // change position
const PROP = 2      // change attr
const TEXT = 3      // change text


function reRender(rootReactElement, rootDOMElement) {
  while (rootDOMElement.hasChildNodes()) {
    rootDOMElement.removeChild(rootDOMElement.lastChild)
  }
  ReactDOM.render(rootReactElement, rootDOMElement)

  // v-dom diff
  // const diffInfo = diff(vdom, ovdom)
  // patch(el, diffInfo)
}


class Component {
  constructor(props) {
    this.props = props
    this.state = this.state || {}

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getSnapshotBeforeUpdate = this.getSnapshotBeforeUpdate.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    reRender(window.vdom, window.el)
    this.state = this.nextState
  }
}


export default Component
