import { Map, } from 'immutable'
import { handleActions } from 'redux-actions'
import { EditorState } from 'draft-js'

const initialState = Map({
  editorState: EditorState.createEmpty(),
})

const reduceRichDiv = (types) => {
  const {
    RICHDIV_SET_EDITORSTATE,
  } = types

  return handleActions({
    [RICHDIV_SET_EDITORSTATE]: (state, action) => {
      const { payload: { editorState } } = action
      return state.set('editorState', editorState)
    },
  }, initialState)
}

export default reduceRichDiv
