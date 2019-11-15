import { createAction } from 'redux-actions'

const createRichDiv = (types) => {
  const {
    RICHDIV_SET_EDITORSTATE,
  } = types

  const actionsPure = {
    setEditorState: createAction(RICHDIV_SET_EDITORSTATE, (editorState) => {
      return { editorState, }
    }),
  }

  const actionsSideEffect = {
    editor: {
      onChange(editorState) {
        this.props.actions.setEditorState(editorState)
      },
    },
  }

  return {
    actionsPure,
    actionsSideEffect,
  }
}

export default createRichDiv
