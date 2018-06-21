import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions, } from '~modules';

// TODO change to richdiv action then
const { todo: { actionsPure, actionsSideEffect } } = actions;

class RichDiv extends React.Component {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.actions = actions.utils.bindActions(this, actionsSideEffect)
  }

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <div>
        Rich Div Page
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
    }
  },

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    }
  },
)(RichDiv)
