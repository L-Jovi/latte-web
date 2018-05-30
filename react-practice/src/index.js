import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, } from 'react-router-redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import 'todomvc-app-css/index.css'

const store = createStore(reducer)

const history = syncHistoryWithStore(browserHistory, store);

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
        render();
    })
}

render()
