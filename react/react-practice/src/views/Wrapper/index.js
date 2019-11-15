import React from 'react'
import './index.less'

class Wrapper extends React.Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper
