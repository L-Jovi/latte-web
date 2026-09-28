import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
export type Filter = 'All' | 'Active' | 'Completed';
interface TodosState {
  items: Todo[];
  filter: Filter;
  nextId: number;
}
const initialState: TodosState = {
  items: [{ id: 0, text: 'Use Redux', completed: false }],
  filter: 'All',
  nextId: 1,
};
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      if (action.payload.trim())
        state.items.push({
          id: state.nextId++,
          text: action.payload.trim(),
          completed: false,
        });
    },
    editTodo(state, action: PayloadAction<{ id: number; text: string }>) {
      const todo = state.items.find((item) => item.id === action.payload.id);
      if (todo) todo.text = action.payload.text.trim();
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    completeTodo(state, action: PayloadAction<number>) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    completeAllTodos(state) {
      const complete = !state.items.every((item) => item.completed);
      state.items.forEach((item) => (item.completed = complete));
    },
    clearCompleted(state) {
      state.items = state.items.filter((item) => !item.completed);
    },
    setVisibilityFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    addBatch(state, action: PayloadAction<string[]>) {
      state.items.push(
        ...action.payload.map((text) => ({
          id: state.nextId++,
          text,
          completed: false,
        })),
      );
    },
  },
});
export const actions = slice.actions;
export const api = createApi({
  reducerPath: 'imports',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    examples: build.query<string[], void>({
      async queryFn(_arg, _api, _options, fetchWithBQ) {
        const result = await fetchWithBQ(
          new URL('./todos.json', document.baseURI).href,
        );
        if (result.error) return { error: result.error };
        if (
          !Array.isArray(result.data) ||
          !result.data.every((value) => typeof value === 'string')
        )
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Expected a list of titles',
            },
          };
        return { data: result.data };
      },
    }),
  }),
});
export const { useLazyExamplesQuery } = api;
export const createModernStore = () =>
  configureStore({
    reducer: { todos: slice.reducer, [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
export type AppStore = ReturnType<typeof createModernStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
