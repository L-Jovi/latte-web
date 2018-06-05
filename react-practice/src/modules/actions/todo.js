import { createAction } from 'redux-actions'

const createTodo = (types) => {
  const {
    TODO_ADD,
    TODO_DELETE,
    TODO_EDIT,
    TODO_COMPLETE,
    TODO_COMPLETE_ALL,
    TODO_CLEAR_COMPLETED,
    TODO_SET_VISIBILITY_FILTER,
  } = types

  const actionsPure = {
    addTodo: createAction(TODO_ADD, (text) => {
      return { text, }
    }),

    deleteTodo: createAction(TODO_DELETE, (id) => {
      return { id, }
    }),

    editTodo: createAction(TODO_EDIT, (id, text) => {
      return { id, text, }
    }),

    completeTodo: createAction(TODO_COMPLETE, (id) => {
      return { id, }
    }),

    completeAllTodos: createAction(TODO_COMPLETE_ALL, () => {
      return {}
    }),

    clearCompleted: createAction(TODO_CLEAR_COMPLETED, () => {
      return {}
    }),

    setVisibilityFilter: createAction(TODO_SET_VISIBILITY_FILTER, (filter) => {
      return { filter }
    }),
  }

  const actionsSideEffect = {
      todoTextInput: {
        onSave(text) {
          if (text.length !== 0) {
            this.props.actions.addTodo(text)
          }
        },
      },
  }

  return {
    actionsPure,
    actionsSideEffect,
  }
}

export default createTodo
