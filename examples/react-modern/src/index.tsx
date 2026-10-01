import { createRoot } from 'react-dom/client';
import App from './App';
import { createModernStore } from './store';
import './style.css';
const store = createModernStore();
const root = createRoot(document.querySelector('#root')!);
const draw = () => root.render(<App store={store} />);
draw();
// The page can switch language (assets/language.js). Rendering the same tree
// again keeps the store and every component's state; only the words change.
document.addEventListener('languagechange', draw);
