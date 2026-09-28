# Events and scheduling

English | [简体中文](README.zh-Hans.md)

Observe listener propagation separately from task and microtask scheduling.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/events/dom-event/index.html`.

## Read the mechanism

Start with [dom-event/event-register.js](dom-event/event-register.js), [web-task/task-order.js](web-task/task-order.js), [node-task/task-order.cjs](node-task/task-order.cjs).

The DOM example stops immediate propagation deliberately. The web-task scripts include a trap: Promise.resolve(function) stores the function; it does not call it. Node is run as CommonJS so its initial nextTick ordering is explicit. Timer versus immediate order at top level is not guaranteed.

## Today and earlier approaches

Run node fundamentals/events/node-task/task-order.cjs from the repository root. Compare actual logs, not memorized universal ordering.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
