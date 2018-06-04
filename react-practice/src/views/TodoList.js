import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TodoItem from '../components/TodoItem'
import { actions, } from '~modules'
import { getVisibleTodos } from '~modules/selectors'

const { todo: { actionsPure, actionsSideEffect } } = actions


class TodoList extends React.Component {
  static propTypes = {
    filteredTodos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    actions: PropTypes.object.isRequired
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
      <ul className="todo-list">
        {this.props.filteredTodos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            {...this.props.actions}
          />
        )}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    return {
      filteredTodos: getVisibleTodos(state),
    }
  },

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    }
  },
)(TodoList)
