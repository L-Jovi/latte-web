import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './src/store';
import App from './src/views/App';

const About = () => <h2>Page 1</h2>;
const Users = () => <h2>Page 2</h2>;

ReactDom.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </Switch>
    </Router>
  </Provider>
, document.getElementById('root'));
