import { combineReducers } from 'redux-immutable'

import reduceRouting from './routing'
import reduceTodo from './todo'
import reduceVisibilityFilter from './visibilityFilter'
import reduceRichDiv from './richDiv'

const reduceRoot = (types) => {
  return combineReducers({
    routing: reduceRouting(),
    todo: reduceTodo(types),
    visibilityFilter: reduceVisibilityFilter(types),
    richDiv: reduceRichDiv(types),
  })
}

export default reduceRoot
