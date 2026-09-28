import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import './style.css';
function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [saved, setSaved] = useState('');
  return (
    <>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          editor.focus();
        }}
      >
        Bold
      </button>
      <button
        onClick={() =>
          setSaved(JSON.stringify(editor.getEditorState().toJSON(), null, 2))
        }
      >
        Save JSON
      </button>
      <pre aria-label="Saved state">{saved}</pre>
    </>
  );
}
function App() {
  return (
    <main>
      <h1>Lexical editor and plugins</h1>
      <p>Type, select text, apply bold and inspect the saved state.</p>
      <LexicalComposer
        initialConfig={{
          namespace: 'latte-web',
          theme: { text: { bold: 'bold' } },
          onError: (error) => {
            throw error;
          },
        }}
      >
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="editor" aria-label="Editor" />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </main>
  );
}
createRoot(document.querySelector('#root')).render(<App />);
