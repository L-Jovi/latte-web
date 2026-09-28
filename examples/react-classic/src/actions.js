import { createAction } from 'redux-actions';
export const addTodo = createAction('TODO/ADD', (text) => ({ text }));
export const editTodo = createAction('TODO/EDIT', (id, text) => ({ id, text }));
export const deleteTodo = createAction('TODO/DELETE', (id) => ({ id }));
export const completeTodo = createAction('TODO/COMPLETE', (id) => ({ id }));
export const completeAllTodos = createAction('TODO/COMPLETE_ALL');
export const clearCompleted = createAction('TODO/CLEAR_COMPLETED');
export const setVisibilityFilter = createAction('TODO/FILTER', (filter) => ({
  filter,
}));
export const importTodos = createAction('TODO/IMPORT');
