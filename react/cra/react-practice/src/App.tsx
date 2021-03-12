import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Welcome from './Welcome';
import Topics from './Topics';

export default function App() {
  return (
    <Router>
      <NavLink to="/topics" activeClassName="hurray">
        Topics
      </NavLink>
      <nav>
        <ul>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}
