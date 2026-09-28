import { createRoot } from 'react-dom/client';
import App from './App';
import { createModernStore } from './store';
import './style.css';
createRoot(document.querySelector('#root')!).render(
  <App store={createModernStore()} />,
);
