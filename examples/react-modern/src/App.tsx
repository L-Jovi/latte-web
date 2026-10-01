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
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
const say = (en: string, zh: string) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
// The slice keeps the filter names and the sample todos in English, and
// TodoPage keeps its status in English. These are the words the Chinese page
// shows for them; a todo the reader typed is shown as typed.
const chinese: Record<string, string> = {
  All: '全部',
  Active: '未完成',
  Completed: '已完成',
  Loading: '加载中',
  'Use Redux': '使用 Redux',
  'Read a dependency graph': '读一张依赖图',
  'Keep examples small': '让示例保持精简',
};
const toChinese = (english: string) =>
  chinese[english] ??
  english.replace(/^Imported (\d+) todos$/, '已导入 $1 条待办');
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
            aria-label={say('Edit todo', '编辑待办')}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button>{say('Save', '保存')}</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(actions.completeTodo(todo.id))}
            />
            {say(todo.text, toChinese(todo.text))}
          </label>
          <button
            onClick={() => {
              setText(todo.text);
              setEditing(true);
            }}
          >
            {say('Edit', '编辑')}
          </button>
          <button onClick={() => dispatch(actions.deleteTodo(todo.id))}>
            {say('Delete', '删除')}
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
      <h1>{say('Todos', '待办')}</h1>
      <p>
        {say(
          'Modern: Hooks, TypeScript, Redux Toolkit and RTK Query.',
          '现代写法：Hooks、TypeScript、Redux Toolkit 和 RTK Query。',
        )}
      </p>
      <form onSubmit={submit}>
        <label>
          {say('New todo', '新待办')}{' '}
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <button>{say('Add', '新增')}</button>
      </form>
      <div>
        {(['All', 'Active', 'Completed'] as Filter[]).map((value) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => dispatch(actions.setVisibilityFilter(value))}
          >
            {say(value, toChinese(value))}
          </button>
        ))}
      </div>
      <ul aria-label={say('Todo list', '待办列表')}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => dispatch(actions.completeAllTodos())}>
        {say('Toggle all', '全部切换')}
      </button>
      <button onClick={() => dispatch(actions.clearCompleted())}>
        {say('Clear completed', '清除已完成')}
      </button>
      <button disabled={isFetching} onClick={importExamples}>
        {say('Import examples', '导入示例')}
      </button>
      <p role="status">{say(status, toChinese(status))}</p>
      {isError && (
        <p role="alert">
          {say('Import failed. Try again.', '导入失败，请重试。')}
        </p>
      )}
    </main>
  );
}
export default function App({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <HashRouter>
        <nav>
          <Link to="/">{say('Todos', '待办')}</Link>
          <Link to="/about">{say('About', '关于')}</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route
            path="/about"
            element={
              <main>
                <h1>{say('About this comparison', '关于这组对照')}</h1>
                <p>
                  {say(
                    'RTK Query owns the request lifecycle; the slice owns local Todo state.',
                    'RTK Query 负责请求的生命周期；slice 负责本地的 Todo 状态。',
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
