import type { EnthusiasmAction } from '../actions/index.js';
import type { StoreState } from '../types/index.js';
export function enthusiasm(
  state: StoreState = { languageName: 'TypeScript', enthusiasmLevel: 1 },
  action: EnthusiasmAction,
): StoreState {
  switch (action.type) {
    case 'INCREMENT_ENTHUSIASM':
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case 'DECREMENT_ENTHUSIASM':
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1),
      };
    default:
      return state;
  }
}
