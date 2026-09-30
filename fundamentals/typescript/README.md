# TypeScript: typed actions and reducers

English | [简体中文](README.zh-Hans.md)

A discriminated union tells the compiler which action each branch of a reducer handles. Each action is an object whose `type` field holds a fixed string, so a misspelled action type does not compile.

## Try it

```sh
npm ci
npm run build -w @latte/typescript
```

There is no page to open: the result is files. The compiler writes plain JavaScript to `fundamentals/typescript/dist/`, with one `.js` file and one `.d.ts` file (the types, for other TypeScript code to use) for each source file. Compare [reducers/index.ts](reducers/index.ts) with `dist/reducers/index.js`: the code is the same, and only the types are gone.

To watch the compiler catch a mistake, change `'INCREMENT_ENTHUSIASM'` in a `case` of `reducers/index.ts` to `'INCREMENT_ENTHUSIASMM'` and run the build again. It now fails with error TS2678, because that string is not one of the two action types.

## How it works

A _discriminated union_ is a type that can be one of several object shapes, told apart by one field they all share. Read the files in this order:

1. [types/narrowing.ts](types/narrowing.ts) (4 lines) shows the idea on its own. A `Result<T>` is either `{ ok: true; value: T }` or `{ ok: false; message: string }`. After `explain` checks `result.ok`, TypeScript knows which of the two it has: it allows `result.value` only on the success side, and `result.message` only on the error side. Learning the exact type from a check like this is called _narrowing_.
2. [constants/index.ts](constants/index.ts) (2 lines) holds the two action type strings.
3. [actions/index.ts](actions/index.ts) (10 lines) builds `EnthusiasmAction` from them: either `{ type: 'INCREMENT_ENTHUSIASM' }` or `{ type: 'DECREMENT_ENTHUSIASM' }`. It also has one function per action that creates it.
4. [reducers/index.ts](reducers/index.ts) (18 lines) is the _reducer_: a function that takes the current state and an action, and returns the next state. It starts from `{ languageName: 'TypeScript', enthusiasmLevel: 1 }`, a shape described in [types/index.ts](types/index.ts). It adds 1 on an increment, and uses `Math.max(1, …)` so that a decrement never takes the level below 1.

Because `action.type` can only be one of two strings, a `case` with any other string is an error, and so is calling the reducer with an unknown action type.

## Then and now

This code comes from a Create React App project written in TypeScript. Only its typed actions and reducer are kept, with the same scenario of raising and lowering an "enthusiasm level"; the duplicate Create React App setup around them was removed. The React team [deprecated Create React App on 2025-02-14](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).

Redux code of that time was written like this: action type constants, action creators and a reducer, all by hand. As of 2026-09, [Redux Toolkit is the officially recommended way to write Redux](https://redux.js.org/introduction/why-rtk-is-redux-today), and its `createSlice` generates the action creators and action types for you. The hand-written version shows what it generates. The [modern Todo app](../../examples/react-modern/README.md) uses `createSlice` with TypeScript.

## Limits

- TypeScript checks types only when it compiles. JavaScript callers, or data that arrives while the program runs, such as JSON from a server, can still pass an action of any shape, so input like that needs its own validation.
- The reducer's `default` branch returns the state unchanged. If a third action type were added to `EnthusiasmAction` without a `case`, the compiler would not complain.
- There is no store, no user interface and no page: only the types, the actions and the reducer. It is a small example, not a starting point for a real project.
- A successful build shows that the types fit together, not that the logic is right. A separate test checks what the reducer does (see below).

## Checks and credits

- `npm run typecheck` runs `tsc --noEmit` in every workspace, this one included, with `strict` mode on.
- After the build, `npm run test:tooling` loads `dist/reducers/index.js`. It checks that a decrement from the starting state keeps the level at 1, that an increment then raises it to 2, and that the state keeps exactly its two fields.
- `npm run check` runs both, together with the rest of the repository's checks. `dist/` is not committed; the build creates it.
- The [migration ledger](../../docs/migration.md) links to the original version, in the `typescript` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
