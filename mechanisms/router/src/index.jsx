import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route } from './router.jsx';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
    <h1>A tiny History router</h1>
    <nav>
      <Link to={base + '/'}>Home</Link> ·{' '}
      <Link to={base + '/about'}>About</Link>
    </nav>
    <Route path={base} render={() => <h2>Home view</h2>} />
    <Route path={base + '/about'} render={() => <h2>About view</h2>} />
  </BrowserRouter>,
);
