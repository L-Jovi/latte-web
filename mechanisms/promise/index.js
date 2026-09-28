// Stage 3: the original class/callback style, with chaining and aggregation.
class ForgePromise {
  callbacks = []
  state = 'pending'
  value = undefined
  constructor(executor) {
    if (typeof executor !== 'function') throw new TypeError('Expected an executor')
    let called = false
    try {
      executor(value => { if (!called) { called = true; this.resolve(value) } },
        reason => { if (!called) { called = true; this.reject(reason) } })
    } catch (error) { if (!called) { called = true; this.reject(error) } }
  }
  then(onFulfilled, onRejected) {
    return new ForgePromise((resolve, reject) => this.handle({resolve, reject, onFulfilled, onRejected}))
  }
  settle(state, value) {
    if (this.state !== 'pending') return
    this.state = state
    this.value = value
    this.callbacks.splice(0).forEach(callback => this.handle(callback))
  }
  resolve(value) {
    if (this.state !== 'pending') return
    if (value === this) return this.reject(new TypeError('Self resolution'))
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      let then
      try { then = value.then } catch (error) { return this.reject(error) }
      if (typeof then === 'function') {
        let called = false
        try {
          then.call(value, next => { if (!called) { called = true; this.resolve(next) } },
            error => { if (!called) { called = true; this.reject(error) } })
        } catch (error) { if (!called) { called = true; this.reject(error) } }
        return
      }
    }
    this.settle('fulfilled', value)
  }
  reject(reason) { this.settle('rejected', reason) }
  handle(callback) {
    if (this.state === 'pending') { this.callbacks.push(callback); return }
    queueMicrotask(() => {
      const handler = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
      if (typeof handler !== 'function') {
        ;(this.state === 'fulfilled' ? callback.resolve : callback.reject)(this.value)
        return
      }
      try { callback.resolve(handler(this.value)) } catch (error) { callback.reject(error) }
    })
  }
  catch(handler) { return this.then(undefined, handler) }
  finally(handler) {
    if (typeof handler !== 'function') return this.then()
    return this.then(value => ForgePromise.resolve(handler()).then(() => value),
      reason => ForgePromise.resolve(handler()).then(() => { throw reason }))
  }
  static resolve(value) { return value instanceof ForgePromise ? value : new ForgePromise(resolve => resolve(value)) }
  static reject(reason) { return new ForgePromise((_, reject) => reject(reason)) }
  static all(values) {
    return new ForgePromise((resolve, reject) => {
      const items = Array.from(values)
      const results = new Array(items.length)
      let remaining = items.length
      if (!remaining) return resolve(results)
      items.forEach((item, index) => ForgePromise.resolve(item).then(value => {
        results[index] = value
        if (--remaining === 0) resolve(results)
      }, reject))
    })
  }
  static race(values) {
    return new ForgePromise((resolve, reject) => {
      for (const value of values) ForgePromise.resolve(value).then(resolve, reject)
    })
  }
}
