// CommonJS startup: sync, nextTick, then Promise microtasks.
// Top-level setTimeout versus setImmediate order depends on timer readiness.
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
setTimeout(() => console.log(3));
setTimeout(() => console.log(4));

Promise.resolve().then(() => console.log(5));
Promise.resolve().then(() => console.log(6));
Promise.resolve().then(() => console.log(7));
process.nextTick(() => console.log(8));

(() => console.log(9))();
