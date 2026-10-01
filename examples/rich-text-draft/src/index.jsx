import React from 'react';
import { createRoot } from 'react-dom/client';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './style.css';
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
class DraftExample extends React.Component {
  state = { editorState: EditorState.createEmpty(), saved: '' };
  editor = React.createRef();
  render() {
    return (
      <main>
        <h1>{say('Draft.js controlled editor', 'Draft.js 受控编辑器')}</h1>
        <p>
          {say(
            'Type, select text, apply bold and inspect the saved state.',
            '输入一段文字，选中其中一部分设为粗体，再看看保存下来的状态。',
          )}
        </p>
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
          {say('Bold', '加粗')}
        </button>
        <div className="editor">
          <Editor
            ref={this.editor}
            ariaLabel={say('Editor', '编辑器')}
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
          {say('Save JSON', '保存为 JSON')}
        </button>
        <pre aria-label={say('Saved state', '保存下来的状态')}>
          {this.state.saved}
        </pre>
      </main>
    );
  }
}
const root = createRoot(document.querySelector('#root'));
root.render(<DraftExample />);
// Rendering again after a language switch keeps the editor's state.
document.addEventListener('languagechange', () =>
  root.render(<DraftExample />),
);
