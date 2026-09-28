import { createRoot } from 'react-dom/client';
import { Hello } from './components/Hello';
createRoot(document.querySelector('#root')!).render(
  <Hello compiler="TypeScript" framework="React 19" />,
);
