# Search suggestions with the keyboard

English | [简体中文](README.zh-Hans.md)

Filter suggestions as you type and choose one with the arrow keys, using accessible combobox markup. A _combobox_ is a text box with a list of suggestions attached; the markup tells screen readers how the two belong together.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/search/
```

It works right after cloning; no `npm ci` or build step is needed. Type `graph` in the **Topic** box: one suggestion, **GraphQL**, appears. Press the down arrow, then Enter: the box fills in and the text below says `Selected: GraphQL`. Clicking or tapping a suggestion picks it too. Escape, or moving the focus away from the box, closes the list. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/search/index.html).

## How it works

Read [topics.json](topics.json), the 11 topics, then [app.js](app.js) (97 lines).

1. When the page loads, one `fetch` reads `topics.json`. If that fails, the page says `Could not load topics` and gives the reason.
2. On every keystroke, the list shows the topics that contain the typed text, ignoring upper and lower case.
3. Each suggestion is added with `textContent`, so a topic is always shown as text and never interpreted as HTML.
4. The up and down arrows move a highlight through the list and wrap around at the ends. Enter picks the highlighted topic.
5. Each suggestion cancels its own `pointerdown`, so the box keeps the focus while you click, and the click picks the topic.

The ARIA attributes, extra HTML attributes that describe the page to assistive technology, follow the [combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). The input has `role="combobox"` and says whether the list is open with `aria-expanded`. The list is a `listbox` of `option`s. The highlighted option has `aria-selected="true"`, and the input points to it with `aria-activedescendant`, so the focus can stay in the box while a screen reader follows the highlight.

## Then and now

The original sample sent every keystroke to a public search engine's suggestion service: one version used jQuery, another a synchronous `XMLHttpRequest`, which froze the page until the answer came back. Both built the list by joining HTML strings, so a suggestion was read as markup. The service has since expired. This version keeps the suggestions and the keyboard selection, and makes one `fetch` to a local file instead.

## Limits

- The list of topics is fixed, so the example behaves the same every time.
- A real search service would also need to cancel requests that are no longer needed, show that it is loading, and wait until the typing pauses. Those are separate examples: [JSONP vs fetch with CORS](../../network/README.md) cancels a request with `AbortController`, and [Debounce](../../../mechanisms/utilities/debounce/README.md) waits for a pause.

## Checks and credits

- `npm run test:browser` types `graph` in Chromium, Firefox and WebKit and expects a single **GraphQL** option. It presses the down arrow and Enter and expects `Selected: GraphQL`, then types `css`, presses Escape and checks that the list is hidden. Clicking a suggestion is not tested. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- The [original sample](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/search-input) was an imooc practice exercise.
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). There are no images or fonts.
