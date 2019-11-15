// import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, } from 'react-router-redux'
import { Provider } from 'react-redux'

import store from '~modules'
import 'todomvc-app-css/index.css'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS()
  }
})

const render = () => {
  const Routes = require('./routes').default
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    render()
  })
}

render()
