import { fork, take, put, call, select, } from 'redux-saga/effects'
import * as githubRepo from '~services/githubRepo'

const combineTodo = (types) => {
  const {
    TODO_GET_REPOS,
    TODO_BATCH_ADD,
  } = types

  const handleLongName = (data) => {
    return data.map((name) => {
      return name.length > 15 ? `${name.slice(0, 10)}...` : name
    })
  }

  const selectStartId = (state) => {
    const todo = state.get('todo').toArray()
    return todo.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
  }

  const transformTodo = (names, startId) => {
    return names.map((name) => {
      return {
        text: name,
        completed: false,
        id: startId++,
      }
    })
  }

  /*
   * 下面取得业务数据后，在中间件内进行进一步编排，直到组装出界面所需的结构
   * 编排顺序整体是同步的，但是我们可以使用到操作符适应复杂场景的需求
   * 下面以处理名字长度为例，并使用到操作符获取到上一次 todo 的末端 id
   * 整体的操作流程很清晰的呈现在 watchGetRepos 的函数内
   * */
  function* watchGetRepos() {
    while (yield take(TODO_GET_REPOS)) {
      const data = yield call(githubRepo.getRepos)
      const names = yield call(handleLongName, data)
      const startId = yield select(selectStartId)
      const todoTail = yield call(transformTodo, names, startId)
      yield put({
        type: TODO_BATCH_ADD,
        payload: { todo: todoTail, },
      });
    }
  }

  function* watch() {
    yield [
      fork(watchGetRepos),
    ]
  }

  return watch
}

export default combineTodo
