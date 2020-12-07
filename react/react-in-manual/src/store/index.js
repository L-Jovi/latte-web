import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import incrementReducer from '../reducers'
import { watchIncrementAsync } from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchIncrementAsync)
export default store
