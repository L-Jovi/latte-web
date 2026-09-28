# Visual experiments

English | [简体中文](README.zh-Hans.md)

Small pages preserve drawing, geometry and event-handling lessons. Start the root server with `npm run dev`; each linked page works without a bundler. The [performance lab](../performance/README.md) has its own Vite build.

- [Dot matrix clock](clock/README.md)
- [Canvas pixels and image operations](canvas-image/README.md)
- [Mouse and Pointer Events](drag/README.md)
- [Gesture paging](paging/README.md)
- [Layered carousel and Scroll Snap](carousel/README.md)
- [Photo wall transforms](photo-wall/README.md)
- [Local search suggestions](search/README.md)
- [Navigation, steps and circular progress](motion/README.md)
- [Rotating selector](lottery/README.md)

Compare a mechanism before choosing a tool: mouse offsets → pointer capture, manual tracks → Scroll Snap, timer increments → elapsed-time animation. Each README describes observable behavior and intentional limits. `npm run test:browser` covers entry loading and interactions in three engines; `npm test` checks pixel/slot arithmetic. There are no backend services, prize systems or third-party visual assets here. Local GPL notices remain on their derived examples; other original code is MIT.
