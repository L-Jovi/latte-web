import { useState, type FormEvent } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import {
  actions,
  useLazyExamplesQuery,
  type AppStore,
  type AppDispatch,
  type RootState,
  type Todo,
  type Filter,
} from './store';
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();
function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  function save(event: FormEvent) {
    event.preventDefault();
    dispatch(
      text.trim()
        ? actions.editTodo({ id: todo.id, text })
        : actions.deleteTodo(todo.id),
    );
    setEditing(false);
  }
  return (
    <li>
      {editing ? (
        <form onSubmit={save}>
          <input
            aria-label="Edit todo"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button>Save</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(actions.completeTodo(todo.id))}
            />
            {todo.text}
          </label>
          <button
            onClick={() => {
              setText(todo.text);
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => dispatch(actions.deleteTodo(todo.id))}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}
export function TodoPage() {
  const dispatch = useAppDispatch();
  const { items, filter } = useAppSelector((state) => state.todos);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [load, { isFetching, isError }] = useLazyExamplesQuery();
  const todos = items.filter(
    (todo) =>
      filter === 'All' ||
      (filter === 'Completed' ? todo.completed : !todo.completed),
  );
  function submit(event: FormEvent) {
    event.preventDefault();
    dispatch(actions.addTodo(text));
    setText('');
  }
  async function importExamples() {
    setStatus('Loading');
    try {
      const titles = await load().unwrap();
      dispatch(actions.addBatch(titles));
      setStatus(`Imported ${titles.length} todos`);
    } catch {
      setStatus('');
    }
  }
  return (
    <main>
      <h1>Todos</h1>
      <p>Modern: Hooks, TypeScript, Redux Toolkit and RTK Query.</p>
      <form onSubmit={submit}>
        <label>
          New todo{' '}
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
      <div>
        {(['All', 'Active', 'Completed'] as Filter[]).map((value) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => dispatch(actions.setVisibilityFilter(value))}
          >
            {value}
          </button>
        ))}
      </div>
      <ul aria-label="Todo list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => dispatch(actions.completeAllTodos())}>
        Toggle all
      </button>
      <button onClick={() => dispatch(actions.clearCompleted())}>
        Clear completed
      </button>
      <button disabled={isFetching} onClick={importExamples}>
        Import examples
      </button>
      <p role="status">{status}</p>
      {isError && <p role="alert">Import failed. Try again.</p>}
    </main>
  );
}
export default function App({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <HashRouter>
        <nav>
          <Link to="/">Todos</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route
            path="/about"
            element={
              <main>
                <h1>About this comparison</h1>
                <p>
                  RTK Query owns the request lifecycle; the slice owns local
                  Todo state.
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
