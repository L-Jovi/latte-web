import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TodoList from './TodoList'
import Footer from './Footer'
import { actions, } from '~modules';
import { getCompletedTodoCount } from '~modules/selectors'

const { todo: { actionsPure, actionsSideEffect } } = actions;


class MainSection extends React.Component {
  static propTypes = {
    todosCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.actions = actions.utils.bindActions(this, actionsSideEffect)
  }

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {}

  componentDidMount() {
    this.props.actions.getRepos()
  }

  componentWillUnmount() {}

  render() {
    const { todosCount, completedCount, } = this.props;

    return (
      <section className="main">
        {
          !!todosCount && 
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
            />
            <label onClick={this.props.actions.completeAllTodos}/>
          </span>
        }

        <TodoList />

        { !!todosCount && <Footer /> }
      </section>
    )
  }
}

export default connect(
  (state) => {
    const todo = state.get('todo').toArray()
    return {
      todosCount: todo.length,
      completedCount: getCompletedTodoCount(state),
    }
  },

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    }
  },
)(MainSection)
