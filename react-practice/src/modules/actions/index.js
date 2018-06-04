import utils from './utils'
import createTodo from './todo'

const createActions = (types) => {
  return {
    utils, 
    todo: createTodo(types),
  }
}

export default createActions
