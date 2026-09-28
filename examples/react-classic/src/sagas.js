import { call, put, takeLeading } from 'redux-saga/effects';
async function fetchTodos() {
  const response = await fetch(new URL('./todos.json', document.baseURI));
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data) || !data.every((value) => typeof value === 'string'))
    throw new Error('Expected a list of titles');
  return data;
}
function* importTodos() {
  yield put({ type: 'TODO/IMPORT_START' });
  try {
    const titles = yield call(fetchTodos);
    yield put({ type: 'TODO/BATCH_ADD', payload: titles });
  } catch {
    yield put({ type: 'TODO/IMPORT_ERROR' });
  }
}
export function* rootSaga() {
  yield takeLeading('TODO/IMPORT', importTodos);
}
