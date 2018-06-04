import * as types from './constants'
import createActions from './actions'
import reduceRoot from './reducers'
import combineSagas from './sagas'
import createStoreWithMiddleware from './store'

const getStore = () => {
  const {
    createStore,
    runSaga,
  } = createStoreWithMiddleware(reduceRoot(types))

  const store = createStore()
  runSaga(combineSagas(types))

  return store
}

const store = getStore()

export const actions = createActions(types)
export default store
