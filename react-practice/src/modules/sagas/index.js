import { fork } from 'redux-saga/effects'
import combineTodo from './todo'

const combineSagas = (types) => {
  function* root() {
    yield [
      fork(combineTodo(types)),
    ]
  }

  return root
}

export default combineSagas
