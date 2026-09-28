import { Map, List } from 'immutable';
export const initialState = Map({
  todos: List([{ id: 0, text: 'Use Redux', completed: false }]),
  filter: 'All',
  nextId: 1,
  status: '',
  error: '',
});
export function reducer(state = initialState, action) {
  const payload = action.payload || {};
  const todos = state.get('todos');
  switch (action.type) {
    case 'TODO/ADD':
      if (!payload.text.trim()) return state;
      return state
        .set(
          'todos',
          todos.push({
            id: state.get('nextId'),
            text: payload.text.trim(),
            completed: false,
          }),
        )
        .update('nextId', (id) => id + 1);
    case 'TODO/EDIT':
      return state.set(
        'todos',
        todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, text: payload.text.trim() }
            : todo,
        ),
      );
    case 'TODO/DELETE':
      return state.set(
        'todos',
        todos.filter((todo) => todo.id !== payload.id),
      );
    case 'TODO/COMPLETE':
      return state.set(
        'todos',
        todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      );
    case 'TODO/COMPLETE_ALL':
      return state.set(
        'todos',
        todos.map((todo) => ({
          ...todo,
          completed: !todos.every((item) => item.completed),
        })),
      );
    case 'TODO/CLEAR_COMPLETED':
      return state.set(
        'todos',
        todos.filter((todo) => !todo.completed),
      );
    case 'TODO/FILTER':
      return state.set('filter', payload.filter);
    case 'TODO/IMPORT_START':
      return state.set('status', 'Loading').set('error', '');
    case 'TODO/BATCH_ADD': {
      const start = state.get('nextId');
      return state
        .set(
          'todos',
          todos.concat(
            payload.map((text, index) => ({
              id: start + index,
              text,
              completed: false,
            })),
          ),
        )
        .set('nextId', start + payload.length)
        .set('status', `Imported ${payload.length} todos`);
    }
    case 'TODO/IMPORT_ERROR':
      return state.set('status', '').set('error', 'Import failed. Try again.');
    default:
      return state;
  }
}
export function visibleTodos(state) {
  const filter = state.get('filter');
  return state
    .get('todos')
    .filter(
      (todo) =>
        filter === 'All' ||
        (filter === 'Completed' ? todo.completed : !todo.completed),
    )
    .toArray();
}
