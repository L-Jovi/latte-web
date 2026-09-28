import { sayHello } from './greet.js';
const element = document.querySelector('#greeting');
if (element) element.textContent = sayHello('TypeScript modules via Gulp');
