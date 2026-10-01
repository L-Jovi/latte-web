import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route } from './router.jsx';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// The page shows one language at a time (assets/language.js).
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
const root = createRoot(document.querySelector('#root'));
const draw = () =>
  root.render(
    <BrowserRouter>
      <h1>{say('A tiny History router', '一个小小的 History 路由')}</h1>
      <nav>
        <Link to={base + '/'}>{say('Home', '首页')}</Link> ·{' '}
        <Link to={base + '/about'}>{say('About', '关于')}</Link>
      </nav>
      <Route
        path={base}
        render={() => <h2>{say('Home view', '首页视图')}</h2>}
      />
      <Route
        path={base + '/about'}
        render={() => <h2>{say('About view', '关于页视图')}</h2>}
      />
    </BrowserRouter>,
  );
draw();
// Rendering the same tree again keeps BrowserRouter's state: only the words change.
document.addEventListener('languagechange', draw);
