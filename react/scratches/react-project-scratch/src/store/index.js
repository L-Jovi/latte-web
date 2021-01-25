import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import incrementReducer from '@src/reducers'
import { watchIncrementAsync } from '@src/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchIncrementAsync)
export default store
