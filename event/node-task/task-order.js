setTimeout(() => console.log(1));
setImmediate(() => console.log(2));

Promise.resolve().then(() => console.log(4));
process.nextTick(() => console.log(3));

(() => console.log(5))();
