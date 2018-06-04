import { combineReducers } from 'redux-immutable'

import reduceRouting from './routing'
import reduceTodo from './todo'
import reduceVisibilityFilter from './visibilityFilter'

const reduceRoot = (types) => {
  return combineReducers({
    routing: reduceRouting(),
    todo: reduceTodo(types),
    visibilityFilter: reduceVisibilityFilter(types),
  })
}

export default reduceRoot
