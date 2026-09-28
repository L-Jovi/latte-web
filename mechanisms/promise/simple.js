// Stage 1: state and subscriptions only. No chaining or thenable assimilation.
function MyPromise(executor) {
  this.state = 'pending'
  this.value = undefined
  this.callbacks = []
  const finish = (state, value) => {
    if (this.state !== 'pending') return
    this.state = state
    this.value = value
    this.callbacks.splice(0).forEach(notify => queueMicrotask(notify))
  }
  try { executor(value => finish('fulfilled', value), error => finish('rejected', error)) }
  catch (error) { finish('rejected', error) }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const notify = () => {
    const handler = this.state === 'fulfilled' ? onFulfilled : onRejected
    if (typeof handler === 'function') handler(this.value)
  }
  if (this.state === 'pending') this.callbacks.push(notify)
  else queueMicrotask(notify)
  return this
}
