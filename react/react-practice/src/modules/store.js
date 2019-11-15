import { Map } from 'immutable'
import { createStore, applyMiddleware, compose, } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

const createStoreWithMiddleware = (rootReducer) => {
  const beforeEmitter = () => next => action => {
    const beforeAction = {
      ...action,
      type: `BEFORE_${action.type}`
    };
    next(beforeAction); // 'beforeEmitter' emit a 'before-action' for every action
    return next(action);
  };
  const middlewareSaga = createSagaMiddleware()
  const routeMiddleware = routerMiddleware(browserHistory)

  let middlewares = [
    beforeEmitter,
    middlewareSaga,
    routeMiddleware,
  ]

  let enhancer = undefined
  const isDebugging = process.env.NODE_ENV === 'development'
  if (isDebugging === true) {
    const middlewareLogger = createLogger({
      level: ({ error = false }) => error ? `error` : `log`,
      stateTransformer: state => state.toJS(),
      actionTransformer: ({ payload, ...action }) => ({
        ...action,
        ...payload,
      }),
      predicate: (getState, action) => isDebugging,
      collapsed: true,
      duration: true,
    })
    middlewares.push(middlewareLogger)
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )

  } else {
    enhancer = compose(applyMiddleware(...middlewares))
  }

  return {
    createStore: () => {
      return createStore(rootReducer, Map({}), enhancer)
    },
    runSaga: middlewareSaga.run,
  }
}

export default createStoreWithMiddleware
