# Publish and subscribe

English | [简体中文](README.zh-Hans.md)

Keep publishers independent from a changing set of listeners.

## Run and observe

From the repository root: `npm ci`, then `npm test`. Read the small implementation beside the regression cases.

## Read the mechanism

Start with [simple.js](simple.js).

Subscriptions return an unsubscribe function. Delivery snapshots the listener array so removal during dispatch does not skip another listener. Listener exceptions propagate to the publisher.

## Today and earlier approaches

Map avoids special object-key collisions. This synchronous hub does not claim async delivery or distributed messaging.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
