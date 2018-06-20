import { fork, take, } from 'redux-saga/effects'

const combineInterceptor = (types) => {
  function* watchBeforeAction() {
    while (true) {
      const beforeAction = yield take(action => action.type.startsWith("BEFORE"))
      console.log(beforeAction)
    }
  }

  function* watch() {
    yield [
      fork(watchBeforeAction),
    ]
  }

  return watch
}

export default combineInterceptor
