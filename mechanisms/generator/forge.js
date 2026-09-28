// A small explicit program counter, not an implementation of all generator semantics.
function forgeGenerator(step) {
  const context = {next: 0, sent: undefined, done: false, stop() { this.done = true }}
  return {
    next(value) {
      if (context.done) return {value: undefined, done: true}
      context.sent = value
      const result = step(context)
      return {value: result, done: context.done}
    },
    [Symbol.iterator]() { return this }
  }
}
