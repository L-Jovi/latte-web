import React from 'react';
import { createRoot } from 'react-dom/client';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './style.css';
class DraftExample extends React.Component {
  state = { editorState: EditorState.createEmpty(), saved: '' };
  editor = React.createRef();
  render() {
    return (
      <main>
        <h1>Draft.js controlled editor</h1>
        <p>Type, select text, apply bold and inspect the saved state.</p>
        <button
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            this.setState({
              editorState: RichUtils.toggleInlineStyle(
                this.state.editorState,
                'BOLD',
              ),
            });
            this.editor.current.focus();
          }}
        >
          Bold
        </button>
        <div className="editor">
          <Editor
            ref={this.editor}
            ariaLabel="Editor"
            editorState={this.state.editorState}
            onChange={(editorState) => this.setState({ editorState })}
          />
        </div>
        <button
          onClick={() =>
            this.setState({
              saved: JSON.stringify(
                convertToRaw(this.state.editorState.getCurrentContent()),
                null,
                2,
              ),
            })
          }
        >
          Save JSON
        </button>
        <pre aria-label="Saved state">{this.state.saved}</pre>
      </main>
    );
  }
}
createRoot(document.querySelector('#root')).render(<DraftExample />);
