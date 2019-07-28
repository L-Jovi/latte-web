import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import './index.css';
import { createStore } from 'redux';
import { StoreState } from './types';
import { EnthusiasmAction } from './actions'
import { enthusiasm } from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
  languageName: 'TypeScript',
  enthusiasmLevel: 1,
});

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
