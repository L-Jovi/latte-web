// Promises/A+ resolution procedure, retaining the original function/prototype organization.
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function PromiseA(executor) {
  if (!(this instanceof PromiseA) || typeof executor !== 'function') throw new TypeError('Expected an executor')
  this.state = PENDING
  this.value = undefined
  this.queue = []
  let called = false
  try {
    executor(value => { if (!called) { called = true; resolveValue(this, value) } },
      reason => { if (!called) { called = true; settle(this, REJECTED, reason) } })
  } catch (error) {
    if (!called) { called = true; settle(this, REJECTED, error) }
  }
}
function settle(self, state, value) {
  if (self.state !== PENDING) return
  self.state = state
  self.value = value
  for (const notify of self.queue.splice(0)) queueMicrotask(notify)
}
function resolveValue(self, value) {
  if (value === self) return settle(self, REJECTED, new TypeError('A promise cannot resolve to itself'))
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    let then
    try { then = value.then } catch (error) { return settle(self, REJECTED, error) }
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(value, next => {
          if (!called) { called = true; resolveValue(self, next) }
        }, error => {
          if (!called) { called = true; settle(self, REJECTED, error) }
        })
      } catch (error) {
        if (!called) { called = true; settle(self, REJECTED, error) }
      }
      return
    }
  }
  settle(self, FULFILLED, value)
}
PromiseA.prototype.then = function (onFulfilled, onRejected) {
  return new PromiseA((resolve, reject) => {
    const notify = () => {
      const handler = this.state === FULFILLED ? onFulfilled : onRejected
      if (typeof handler !== 'function') {
        ;(this.state === FULFILLED ? resolve : reject)(this.value)
        return
      }
      try { resolve(handler(this.value)) } catch (error) { reject(error) }
    }
    if (this.state === PENDING) this.queue.push(notify)
    else queueMicrotask(notify)
  })
}
PromiseA.prototype.catch = function (handler) { return this.then(undefined, handler) }
