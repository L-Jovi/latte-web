# Dragging with mouse events and Pointer Events

English | [简体中文](README.zh-Hans.md)

The same drag written twice; Pointer Events also cover touch and pen.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/drag/
```

It works right after cloning; no `npm ci` or build step is needed. Drag the **Mouse** block and the **Pointer** block: each follows the pointer and stops at the edges of its pale field. Then move the focus to the **Pointer** block with the Tab key and press the arrow keys: it moves 10 pixels per press. On a phone or tablet, only the **Pointer** block should follow your finger, because dragging with a finger does not send mouse events. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/drag/index.html).

## How it works

Everything is in [app.js](app.js) (59 lines). Both versions remember where inside the block you grabbed it, so the block does not jump to put its corner under the pointer. Both also call the same `move` function, which keeps the block inside its field.

- **Mouse events**: `mousedown` on the block starts the drag. The `mousemove` and `mouseup` listeners sit on the whole `document`, so the drag keeps going when a fast movement leaves the block behind. The drag also ends if the window loses focus.
- **Pointer Events**: one set of events (`pointerdown`, `pointermove`, `pointerup`) for mouse, touch and pen. `setPointerCapture` sends every later event from that pointer to the block, even when the pointer is outside it, so no `document` listeners are needed. The drag ends on `pointerup`, on `pointercancel` (the browser or the system interrupted the gesture) or when the capture is lost. Only the primary pointer and the main button start a drag.
- CSS `touch-action: none` on the blocks tells the browser not to scroll the page when a touch starts on them.

## Then and now

The original sample listened for mouse events on the whole document. [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) now give one set of events for mouse, touch and pen, and pointer capture replaces the document-wide listeners. The mouse version stays because it shows the offset arithmetic plainly.

## Limits

- No inertia after you let go, no drag and drop of data between elements, and no sorting.
- Only the **Pointer** block moves with the keyboard.
- Only one pointer counts at a time, so there is no multi-touch.

## Checks and credits

- `npm run test:browser` drags each block with real mouse input in Chromium, Firefox and WebKit and checks that both move the same 130 pixels to the right. It then presses the right arrow key on the **Pointer** block and checks that it moves 10 more. The stop at the edges is not tested, and neither are touch and pen; try those on a real device. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- Source: the [original drag sample](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/drag). Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
