// word.js
export const word = 'hello'

// message.js
import { word } from './word.js';
const message = `say ${word}`
export default message;

// index.js
import message from './message.js'
console.log(message)
