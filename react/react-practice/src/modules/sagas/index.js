import { fork } from 'redux-saga/effects'
import combineInterceptor from './interceptor'
import combineTodo from './todo'

const combineSagas = (types) => {
  function* root() {
    yield [
      fork(combineInterceptor(types)),
      fork(combineTodo(types)),
    ]
  }

  return root
}

export default combineSagas
