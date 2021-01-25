import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { increment } from '@src/actions'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick() {
    this.props.dispatch(increment())
  }

  onClick2() {
    this.props.dispatch({ type: 'INCREMENT_ASYNC' })
  }

  render() {
    return (
      <div className="container">
        <div>react-router test</div>
        <nav>
          <ul>
          <li>
            <Link to="/about/">Page 1</Link>
          </li>
          <li>
            <Link to="/users/">Page 2</Link>
          </li>
          </ul>
        </nav>

        <br />
        <div> current number: {this.props.number} </div>
        <button onClick={()=>this.onClick()}>click +1 </button>
        <button onClick={()=>this.onClick2()}>click +1 after 2s</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    number: state.number
  })
)(App)
