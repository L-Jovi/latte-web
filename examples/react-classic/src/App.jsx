import React from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import * as actionCreators from './actions.js';
import { visibleTodos } from './reducer.js';
import { say, toChinese } from './say.js';
import TodoItem from './TodoItem.jsx';
export class TodoPage extends React.Component {
  state = { text: '' };
  // connect renders the page again only when the store or the props change,
  // so the page redraws itself when the language does.
  componentDidMount() {
    document.addEventListener('languagechange', this.redraw);
  }
  componentWillUnmount() {
    document.removeEventListener('languagechange', this.redraw);
  }
  redraw = () => this.forceUpdate();
  submit = (event) => {
    event.preventDefault();
    this.props.actions.addTodo(this.state.text);
    this.setState({ text: '' });
  };
  render() {
    const { todos, filter, status, error, actions } = this.props;
    return (
      <main>
        <h1>{say('Todos', '待办')}</h1>
        <p>
          {say(
            'Classic: class, connect, Immutable and Saga.',
            '经典写法：class、connect、Immutable 和 Saga。',
          )}
        </p>
        <form onSubmit={this.submit}>
          <label>
            {say('New todo', '新待办')}{' '}
            <input
              value={this.state.text}
              onChange={(event) => this.setState({ text: event.target.value })}
            />
          </label>
          <button>{say('Add', '新增')}</button>
        </form>
        <div>
          {['All', 'Active', 'Completed'].map((value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => actions.setVisibilityFilter(value)}
            >
              {say(value, toChinese(value))}
            </button>
          ))}
        </div>
        <ul aria-label={say('Todo list', '待办列表')}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} actions={actions} />
          ))}
        </ul>
        <button onClick={() => actions.completeAllTodos()}>
          {say('Toggle all', '全部切换')}
        </button>
        <button onClick={() => actions.clearCompleted()}>
          {say('Clear completed', '清除已完成')}
        </button>
        <button
          disabled={status === 'Loading'}
          onClick={() => actions.importTodos()}
        >
          {say('Import examples', '导入示例')}
        </button>
        <p role="status">{say(status, toChinese(status))}</p>
        {error && <p role="alert">{say(error, toChinese(error))}</p>}
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
            <Link to="/">{say('Todos', '待办')}</Link>
            <Link to="/about">{say('About', '关于')}</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ConnectedTodo />} />
            <Route
              path="/about"
              element={
                <main>
                  <h1>{say('About this comparison', '关于这组对照')}</h1>
                  <p>
                    {say(
                      'The same Todo scenarios use an explicit action/reducer and Saga pipeline.',
                      '同样的 Todo 场景，这一版用显式的 action/reducer 和 Saga 流水线实现。',
                    )}
                  </p>
                </main>
              }
            />
            <Route
              path="*"
              element={<h1>{say('Page not found', '找不到这个页面')}</h1>}
            />
          </Routes>
        </HashRouter>
      </Provider>
    );
  }
}
