import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor, } from 'draft-js'

import './index.less'
import { actions, } from '~modules'

// TODO change to richdiv action then
const { richDiv: { actionsPure, actionsSideEffect } } = actions

class RichDiv extends React.Component {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.actions = actions.utils.bindActions(this, actionsSideEffect)
  }

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <div className="rich-div">
        <h3> Rich Div Page </h3>
        <div className="editor">
          <Editor
            editorState={this.props.editorState}
            onChange={this.actions.editor.onChange}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    const editorState = state.getIn(['richDiv', 'editorState'])

    return {
      editorState,
    }
  },

  (dispatch) => {
    return {
      actions: bindActionCreators(actionsPure, dispatch),
    }
  },
)(RichDiv)
