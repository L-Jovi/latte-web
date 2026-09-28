# Call, apply and bind

English | [简体中文](README.zh-Hans.md)

Make the receiver of a function call explicit.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/javascript/context/index.html`.

## Read the mechanism

Start with [call.js](call.js), [apply.js](apply.js), [bind.js](bind.js).

The temporary-method model boxes primitive receivers and cannot operate on frozen objects. It does not model strict-mode this exactly. bind covers ordinary function constructors, not classes or exotic built-ins.

## Today and earlier approaches

Compare the output with Function.prototype.call/apply/bind. A unique Symbol and finally prevent collisions and leaked temporary properties.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
