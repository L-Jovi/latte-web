import { createAction } from 'redux-actions'

const createTodo = (types) => {
  const {
    TODO_GET_REPOS,
    TODO_ADD,
    TODO_BATCH_ADD,
    TODO_DELETE,
    TODO_EDIT,
    TODO_COMPLETE,
    TODO_COMPLETE_ALL,
    TODO_CLEAR_COMPLETED,
    TODO_SET_VISIBILITY_FILTER,
  } = types

  /**
   * pure actions 仅仅负责把界面所需的数据传递给 reducer
   * 或者作为指令唤起中间件
   */
  const actionsPure = {
    getRepos: createAction(TODO_GET_REPOS, () => {
      return {}
    }),

    addTodo: createAction(TODO_ADD, (text) => {
      return { text, }
    }),

    addBatchTodo: createAction(TODO_BATCH_ADD, (todos) => {
      return todos
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

  /**
   * actions 本身做的很薄，仅仅是获取到数据展示到界面
   * 如果业务数据本身无法被直接展示，需要考虑转换数据结构的开销
   * 如果转换过程简单，直接使用带有副作用的 actions 处理即可
   * 如果过程较为复杂（有异步过程或复杂的数据结构拼凑），考虑使用中间件的操作符进行编排
   */
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
