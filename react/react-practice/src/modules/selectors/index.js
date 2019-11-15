import { createSelector } from 'reselect'
import {
    FILTERS_SHOW_ALL,
    FILTERS_SHOW_COMPLETED,
    FILTERS_SHOW_ACTIVE,
} from '../constants'

const getVisibilityFilter = state => state.get('visibilityFilter').toObject()
const getTodos = state => state.get('todo').toArray()

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter.filter) {
      case FILTERS_SHOW_ALL:
        return todos
      case FILTERS_SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case FILTERS_SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos => (
    todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
  )
)
