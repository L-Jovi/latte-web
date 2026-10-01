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
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
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
        {say('Bold', '加粗')}
      </button>
      <button
        onClick={() =>
          setSaved(JSON.stringify(editor.getEditorState().toJSON(), null, 2))
        }
      >
        {say('Save JSON', '保存为 JSON')}
      </button>
      <pre aria-label={say('Saved state', '保存下来的状态')}>{saved}</pre>
    </>
  );
}
function App() {
  return (
    <main>
      <h1>{say('Lexical editor and plugins', 'Lexical 编辑器与插件')}</h1>
      <p>
        {say(
          'Type, select text, apply bold and inspect the saved state.',
          '输入一段文字，选中其中一部分设为粗体，再看看保存下来的状态。',
        )}
      </p>
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
            <ContentEditable
              className="editor"
              aria-label={say('Editor', '编辑器')}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </main>
  );
}
const root = createRoot(document.querySelector('#root'));
root.render(<App />);
// Rendering again after a language switch keeps the editor and its document.
document.addEventListener('languagechange', () => root.render(<App />));
