import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

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

export default Topics;
