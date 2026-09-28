# Writing guide

English | [简体中文](writing.zh-Hans.md)

How to write documentation in this repository. The goal: a reader who knows a little JavaScript can understand every page on the first read.

## The shape of an example README

Every example README uses the same sections, in this order:

```markdown
# <The name a reader would search for>

English | [简体中文](README.zh-Hans.md)

<One sentence: what the reader will see or understand.>

## Try it

<Up to three commands, then what should appear.>

## How it works

<The idea in plain words, and the file to read first.>

## Then and now

<How this was done before, what people use today and when that changed, with a link to an official source.>

## Limits

<What this small version deliberately leaves out.>

## Checks and credits

<Which test covers it, where the idea came from, and the license.>
```

The Chinese mirror uses 试一试, 原理, 过去与现在, 刻意省略 and 验证与来源 for the same sections.

## Ten rules

1. **Lead with what the reader gets.** "Wait until a burst of calls stops, then run once" beats "A bounded debounce contract".
2. **Explain a term the first time it appears**, in one short clause.
3. **Make every claim observable.** Say what the reader will see when they run it.
4. **Write to the reader, not to maintainers or agents.** Instructions such as "keep the source links" belong in [CONTRIBUTING.md](../CONTRIBUTING.md) or [AGENTS.md](../AGENTS.md).
5. **Prefer short sentences and common words.** Avoid "simply", "just", "obviously" and "trivially": they make a reader who is stuck feel worse.
6. **Date anything that ages.** Write "as of 2026-09" instead of "latest" or "modern".
7. **Only give numbers you have measured**, such as line or test counts, and update them when the code changes.
8. **Link an official source** for history and version claims: release notes, MDN, or the project's own blog.
9. **Keep code in English and formatted as code**: commands, file names, APIs and identifiers.
10. **Chinese mirrors carry the same facts in natural Chinese**, add nothing new, and start with the sync line `> 对应英文版：YYYY-MM-DD。英文版更新后本页可能滞后。`

## Words to avoid

| Instead of                       | Write                                           |
| -------------------------------- | ----------------------------------------------- |
| "contract", "mechanism contract" | what it promises, or what the tests check       |
| "owner source", "owns the index" | the file that defines it, or where it is listed |
| "bounded teaching example"       | small example                                   |
| "boundary" as filler             | the exact thing that is left out                |
| 合同（机制合同、验证合同）       | 保证、约定，或直接说测试检查了什么              |
| 前沿节流                         | 节流（第一次调用立即执行）                      |

## Titles

Use the name a reader would search for: "Throttle", "Build your own router", "Prize wheel". The README heading must match the title in `docs/catalog.json`, because the learning path, the section indexes and the live demo page are generated from it.
