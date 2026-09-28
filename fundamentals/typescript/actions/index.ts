import * as constants from '../constants/index.js';
export type EnthusiasmAction =
  | { type: typeof constants.INCREMENT_ENTHUSIASM }
  | { type: typeof constants.DECREMENT_ENTHUSIASM };
export const incrementEnthusiasm = (): EnthusiasmAction => ({
  type: constants.INCREMENT_ENTHUSIASM,
});
export const decrementEnthusiasm = (): EnthusiasmAction => ({
  type: constants.DECREMENT_ENTHUSIASM,
});
