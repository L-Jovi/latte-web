import { legacy_createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer.js';
import { rootSaga } from './sagas.js';
export function createClassicStore() {
  const saga = createSagaMiddleware();
  const store = legacy_createStore(reducer, applyMiddleware(saga));
  const task = saga.run(rootSaga);
  return Object.assign(store, { dispose: () => task.cancel() });
}
