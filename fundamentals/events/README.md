# Event propagation and the event loop

English | [简体中文](README.zh-Hans.md)

Watch events bubble, then predict and check the order of tasks, microtasks and timers. Two pages log to the browser console, and a third script runs in Node.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/events/dom-event/
```

No install or build is needed: `npm run dev` works right after cloning. Keep the browser console open.

- **Bubbling**, on the page above ([live demo](https://l-jovi.github.io/latte-web/fundamentals/events/dom-event/index.html)). Click the small child box: only `fire child` appears. Click elsewhere in the parent box: `fire parent`. Click a number in the list: the console shows the `<li>` you clicked, then the `<ul>` that is listening.
- **Scheduling**, at `/fundamentals/events/web-task/` ([live demo](https://l-jovi.github.io/latte-web/fundamentals/events/web-task/index.html)). As the page loads, one script logs `script start`, `async2 end`, `Promise`, `script end`, `async3 end`, `promise1`, `async4 end`, `promise2`, `async1 end` and finally `setTimeout`; another logs `Promise.resolve:  2`. Then click the inner box: `click`, `promise` and `observer` appear twice, first for the inner box and then for the outer one, followed by two `animationFrame` and two `timeout` lines.

The Node script needs no server. In a second terminal, from the repository root:

```sh
node fundamentals/events/node-task/task-order.cjs
```

It prints `9`, `8`, `5`, `6`, `7`, then `1`, `3`, `4` and `2`. Whether `2` comes before or after `1 3 4` can change from run to run.

## How it works

**Bubbling.** A click starts at the element you clicked, then _bubbles_ up through its ancestors, so their click listeners run too. In [dom-event/event-register.js](dom-event/event-register.js) (23 lines), the child's first listener calls `e.stopImmediatePropagation()`. That stops the event before it reaches the parent and also skips the child's own second listener, so `fire child 2nd event` and `fire parent` never appear ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)). The commented-out `e.stopPropagation()` would stop only the trip to the parent: the second child listener would run. The list shows _event delegation_: one listener on the `<ul>` handles clicks on every `<li>`. `event.target` is the element you clicked; `event.currentTarget` is the element whose listener is running.

**Scheduling.** The browser runs code in _tasks_, such as a whole script, a timer callback or a click. As soon as the running code finishes (a script, or one event listener), it runs every waiting _microtask_: promise callbacks, the rest of an `async` function after an `await`, and `MutationObserver` notifications ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)). Each timer callback waits for a later task, and `requestAnimationFrame` callbacks run just before the browser next draws the page.

- [web-task/task-order.js](web-task/task-order.js) (39 lines): calling an `async` function runs its body right away, up to its first `await`, so `async2 end` is logged with the synchronous lines. After `script end`, each `await` resumes in a microtask, taking turns with the `.then` callbacks. `setTimeout` needs a new task, so it comes last.
- [web-task/promise-order.js](web-task/promise-order.js) (20 lines) is a trap. `Promise.resolve(fn)` does not call `fn`; it makes a promise whose value is the function itself. The nested code that would log 1, 3, 4, 5 and 6 never runs, and only the `.then` callback logs `2`.
- [web-task/event-call.js](web-task/event-call.js) (23 lines) attaches one handler to both boxes. After each listener, its microtasks run at once: `promise`, then `observer`, triggered by the attribute the handler changes. Only then does the event bubble on to the outer box. Timers and animation frames come later, and which of those comes first can vary.
- [node-task/task-order.cjs](node-task/task-order.cjs) (13 lines): Node runs the synchronous code (`9`), then `process.nextTick` callbacks (`8`), then promise callbacks (`5 6 7`), then timers (`1 3 4`) and `setImmediate` (`2`). At the top level of a script, the order of timers and `setImmediate` is not guaranteed ([Node.js docs](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#setimmediate-vs-settimeout)). The file ends in `.cjs`, so Node runs it as a CommonJS script. In an ES module, promise callbacks run before `nextTick` ones ([Node.js docs](https://nodejs.org/docs/latest-v24.x/api/process.html#when-to-use-queuemicrotask-vs-processnexttick)): copy the file to a `.mjs` name, run it, and you will see `9 5 6 7 8`.

## Then and now

Bubbling and event delegation work the same way today: a single listener on a parent can handle clicks on all its children. The scheduling details have changed, though. The V8 team proposed a change to the ECMAScript specification, since merged, that makes an `await` on a promise take one microtask turn instead of at least three ([V8 blog, 2018-11-12](https://v8.dev/blog/fast-async)). Older articles and engines can therefore print task-order.js in a different order. So compare the real logs with your prediction instead of memorizing one universal order. The first version of these scripts also called `requestAnimationFrame` a "macrotask" in a comment; it is not a timer task, but a callback that runs before the browser draws.

## Limits

- Only click events and bubbling are shown. There is no capturing listener and no `preventDefault()`.
- Some lines have no fixed order: timers and animation frames in the browser, timers and `setImmediate` at the top of a Node script. The logs above show one possible order.

## Checks and credits

- `npm run test:browser` clicks the child box in Chromium, Firefox and WebKit and checks that `fire child` is the only message starting with `fire`, so neither the second child listener nor the parent's listener runs. It also opens both pages and checks that they load without errors. The scheduling orders are not checked automatically.
- The [migration ledger](../../docs/migration.md) links to the original folder, `event`. The Node script was renamed from `task-order.js` to `task-order.cjs` because this repository's `package.json` makes `.js` files ES modules.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
