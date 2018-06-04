import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Link from '../components/Link'
import {
  FILTERS_SHOW_ALL,
  FILTERS_SHOW_COMPLETED,
  FILTERS_SHOW_ACTIVE,
} from '~modules/constants'
import { actions, } from '~modules'
import { getCompletedTodoCount } from '~modules/selectors'

const FILTER_TITLES = {
  [FILTERS_SHOW_ALL]: 'All',
  [FILTERS_SHOW_ACTIVE]: 'Active',
  [FILTERS_SHOW_COMPLETED]: 'Completed'
}
const { todo: { actionsPure, actionsSideEffect } } = actions;


class Footer extends React.Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    clearCompleted: PropTypes.func.isRequired,
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
    const {
      completedCount,
      activeCount,
      visibilityFilter,
    } = this.props

    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong> { activeCount || 'No' } </strong> {itemWord} left
        </span>

        <ul className="filters">
          {Object.keys(FILTER_TITLES).map(filter =>
            <li key={filter}>
              <Link
                filter={filter}
                active={filter === visibilityFilter.filter}
                setFilter={
                  () => this.props.actions.setVisibilityFilter(filter)
                }>
                { FILTER_TITLES[filter] }
              </Link>
            </li>
          )}
        </ul>

        {
          !!completedCount &&
          <button
            className="clear-completed"
            onClick={this.props.actions.clearCompleted}>
            Clear completed
          </button>
        }
      </footer>
    )
  }
}

export default connect(
  (state) => {
    const todo = state.get('todo').toArray()
    const visibilityFilter = state.get('visibilityFilter').toObject()

    const todosCount = todo.length
    const completedCount = getCompletedTodoCount(state)

    return {
      completedCount,
      activeCount: todosCount - completedCount,
      visibilityFilter,
    }
  },

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    }
  },
)(Footer)
