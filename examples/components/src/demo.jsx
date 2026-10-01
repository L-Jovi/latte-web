import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, Button } from './index.js';
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
function Demo() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <h1>{say('One small component library', '一个小小的组件库')}</h1>
      <Button
        message={say(`Count: ${count}`, `计数：${count}`)}
        onClick={() => setCount(count + 1)}
      />
    </Card>
  );
}
const root = createRoot(document.querySelector('#root'));
root.render(<Demo />);
// Rendering again after a language switch keeps the count.
document.addEventListener('languagechange', () => root.render(<Demo />));
