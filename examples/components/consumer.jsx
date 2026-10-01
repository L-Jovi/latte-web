import React from 'react';
import { createRoot } from 'react-dom/client';
import { Card, Button } from './dist/babel/index.js';
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown.
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
const root = createRoot(document.querySelector('#root'));
const draw = () =>
  root.render(
    <Card>
      <h1>{say('Built Babel consumer', 'Babel 产物的消费页面')}</h1>
      <Button message={say('Babel package loaded', 'Babel 包已加载')} />
    </Card>,
  );
draw();
// Draw the card again in the other language after a switch.
document.addEventListener('languagechange', draw);
