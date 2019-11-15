import { Map, } from 'immutable'
import { handleActions } from 'redux-actions'
import { FILTERS_SHOW_ALL, } from '../constants'

let initialState = Map({
  filter: FILTERS_SHOW_ALL,
})

const reduceVisibilityFilter = (types) => {
  const {
    TODO_SET_VISIBILITY_FILTER,
  } = types

  return handleActions({
    [TODO_SET_VISIBILITY_FILTER]: (state, action) => {
      const { payload: { filter, } } = action
      return state.set('filter', filter)
    },
  }, initialState)
}

export default reduceVisibilityFilter
