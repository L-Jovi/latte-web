import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TodoTextInput from '../components/TodoTextInput'
import { actions, } from '~modules';

const { todo: { actionsPure, actionsSideEffect } } = actions;


class Header extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.actions = actions.utils.bindActions(this, actionsSideEffect)
  }

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <header className="header">
        <h1>TODO List</h1>
        <TodoTextInput
          newTodo={true}
          onSave={(text) => {
            if (text.length !== 0) {
              this.props.actions.addTodo(text)
            }
          }}
          placeholder="What needs to be done?"
        />
      </header>
    )
  }
}

export default connect(
  (state) => {},

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    };
  },
)(Header)
