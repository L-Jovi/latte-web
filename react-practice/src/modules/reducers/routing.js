import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
})

const reduceRouting = () => {
  return handleActions({
    [LOCATION_CHANGE]: (state, action) => {
      return state.set('locationBeforeTransitions', action.payload)
    },
  }, initialState)
}

export default reduceRouting
