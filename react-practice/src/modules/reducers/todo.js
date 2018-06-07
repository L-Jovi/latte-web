import { List, } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = List([
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
  }
])

const reduceTodo = (types) => {
  const {
    TODO_ADD,
    TODO_BATCH_ADD,
    TODO_DELETE,
    TODO_EDIT,
    TODO_COMPLETE,
    TODO_COMPLETE_ALL,
    TODO_CLEAR_COMPLETED,
  } = types

  return handleActions({
    [TODO_ADD]: (state, action) => {
      const { payload: { text, } } = action
      return state.push({
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text,
      })
    },

    [TODO_BATCH_ADD]: (state, action) => {
      const { payload: { todo, } } = action
      return state.concat(todo)
    },

    [TODO_DELETE]: (state, action) => {
      const { payload: { id, } } = action
      return state.filter(todo => todo.id !== id)
    },

    [TODO_EDIT]: (state, action) => {
      const { payload: { id, } } = action
      return state.map(todo =>
        todo.id === id ?
        { ...todo, text: action.text } : todo
      )
    },

    [TODO_COMPLETE]: (state, action) => {
      const { payload: { id, } } = action
      return state.map(todo =>
        todo.id === id ?
        { ...todo, completed: !todo.completed } : todo
      )
    },

    [TODO_COMPLETE_ALL]: (state, action) => {
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    },

    [TODO_CLEAR_COMPLETED]: (state, action) => {
      return state.filter(todo => todo.completed === false)
    },
  }, initialState)
}

export default reduceTodo
