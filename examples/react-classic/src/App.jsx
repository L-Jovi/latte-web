import React from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import * as actionCreators from './actions.js';
import { visibleTodos } from './reducer.js';
import TodoItem from './TodoItem.jsx';
export class TodoPage extends React.Component {
  state = { text: '' };
  submit = (event) => {
    event.preventDefault();
    this.props.actions.addTodo(this.state.text);
    this.setState({ text: '' });
  };
  render() {
    const { todos, filter, status, error, actions } = this.props;
    return (
      <main>
        <h1>Todos</h1>
        <p>Classic: class, connect, Immutable and Saga.</p>
        <form onSubmit={this.submit}>
          <label>
            New todo{' '}
            <input
              value={this.state.text}
              onChange={(event) => this.setState({ text: event.target.value })}
            />
          </label>
          <button>Add</button>
        </form>
        <div>
          {['All', 'Active', 'Completed'].map((value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => actions.setVisibilityFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <ul aria-label="Todo list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} actions={actions} />
          ))}
        </ul>
        <button onClick={() => actions.completeAllTodos()}>Toggle all</button>
        <button onClick={() => actions.clearCompleted()}>
          Clear completed
        </button>
        <button
          disabled={status === 'Loading'}
          onClick={() => actions.importTodos()}
        >
          Import examples
        </button>
        <p role="status">{status}</p>
        {error && <p role="alert">{error}</p>}
      </main>
    );
  }
}
const ConnectedTodo = connect(
  (state) => ({
    todos: visibleTodos(state),
    filter: state.get('filter'),
    status: state.get('status'),
    error: state.get('error'),
  }),
  (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)(TodoPage);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <nav>
            <Link to="/">Todos</Link>
            <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ConnectedTodo />} />
            <Route
              path="/about"
              element={
                <main>
                  <h1>About this comparison</h1>
                  <p>
                    The same Todo scenarios use an explicit action/reducer and
                    Saga pipeline.
                  </p>
                </main>
              }
            />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </HashRouter>
      </Provider>
    );
  }
}
