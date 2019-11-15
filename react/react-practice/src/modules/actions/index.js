import utils from './utils'
import createTodo from './todo'
import createRichDiv from './richDiv'

const createActions = (types) => {
  return {
    utils, 
    todo: createTodo(types),
    richDiv: createRichDiv(types),
  }
}

export default createActions
