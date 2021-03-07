/*
 * node.js event loop order (libuv)
 *
 * 1. sync call
 * 2. current loop (nextTick -> micro task)
 *    nextTickQueue -> microTaskQueue
 * 3. next loop (timers -> I/O callbacks -> idle -> poll -> check -> close callbacks)
 */

setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
setTimeout(() => console.log(3));
setTimeout(() => console.log(4));

Promise.resolve().then(() => console.log(5));
Promise.resolve().then(() => console.log(6));
Promise.resolve().then(() => console.log(7));
process.nextTick(() => console.log(8));

(() => console.log(9))();
