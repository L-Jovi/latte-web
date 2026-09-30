# Publish and subscribe

English | [简体中文](README.zh-Hans.md)

A minimal `on` / `emit` / `off` event hub; senders never need to know who is listening.

## Try it

There is no demo page. Run the unit tests instead; this works right after cloning, without `npm ci`:

```sh
npm test
```

The results include `✔ publish/subscribe supports unsubscribe during delivery and hostile event names`. To try the hub by hand, paste [simple.js](simple.js) into your browser console, then run:

```js
const hub = new EventHub()
const off = hub.on('greet', (name) => console.log('hello', name))
hub.emit('greet', 'Ada') // logs "hello Ada"
off()
hub.emit('greet', 'Ada') // logs nothing: the listener is gone
```

## How it works

In publish/subscribe, code that sends a message (the publisher) and code that reacts to it (the subscribers) only share an event name. Neither side holds a reference to the other.

[simple.js](simple.js) (21 lines) is a class, `EventHub`, with three methods:

- `on(event, handler)` adds the handler to that event's list and returns a function that unsubscribes it again.
- `emit(event, data)` calls every handler for that event, in the order they subscribed, with `data`.
- `off(event, handler)` removes the handler, and deletes the event's list when it becomes empty.

Two details matter:

- `emit` copies the list before it starts calling handlers. Without the copy, a handler that unsubscribes itself during delivery would shift the list and make the next handler get skipped.
- The lists are stored in a `Map`, keyed by event name. An event named `__proto__` or `constructor` then behaves like any other; in a plain object, such names collide with properties every object already has.

## Then and now

Browsers have a hub built in: `new EventTarget()` gives you `addEventListener`, `removeEventListener` and `dispatchEvent`, and all major browsers have supported it since September 2020 ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget)). Node.js also has `EventEmitter` in `node:events`.

## Limits

- Delivery is synchronous: `emit` calls every handler before it returns.
- If a handler throws, the error reaches the code that called `emit`, and the handlers after it don't run.
- There is no asynchronous delivery, and no messaging between tabs, workers or machines.

## Checks and credits

- `npm test` subscribes two handlers to an event named `__proto__`; the first unsubscribes itself when it runs. After two `emit` calls, the test expects the values `1,2,4`: the second handler was not skipped, and the first ran only once.
- simple.js names [a blog post by amandakelake](https://github.com/amandakelake/blog/issues/65) as its original learning source.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md). The [migration ledger](../../../docs/migration.md) links to the original version.
