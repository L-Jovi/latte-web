import { fork, take, put, call, } from 'redux-saga/effects'

const combineTodo = (types) => {
  const {
    TODO_ADD,
  } = types

  function* test(data) {
  }

  function* watchTest() {
    while (true) {
      const data = yield take(TODO_ADD)
      yield call(test, data)
    }
  }

  function* watch() {
    yield [
      fork(watchTest),
    ]
  }

  return watch
}

export default combineTodo
