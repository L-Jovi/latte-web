import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createClassicStore } from './store.js';
import './style.css';
createRoot(document.querySelector('#root')).render(
  <App store={createClassicStore()} />,
);
