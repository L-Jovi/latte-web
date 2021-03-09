import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Welcome from './Welcome';

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
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

function Topics() {
  const match = useRouteMatch();
  console.log('useRouteMatch:match ', match);

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

interface TopicParams {
  topicId: String;
}

function Topic() {
  const { topicId } = useParams() as TopicParams;
  console.log('useParams:topicId ', topicId);

  return (
    <h3>Requested topic ID: {topicId}</h3>
  );
}
