/*
 * @Description: Promise implemenation.
 * @FileName: promise/index.js
 * https://zhuanlan.zhihu.com/p/58428287
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTD = 'rejected'


class ForgePromise {
  callbacks = []
  state = PENDING
  value = null

  constructor(fn) {
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  // register callback
  then(onFulfilled, onRejected) {
    return new ForgePromise((resolve, reject) => {
      this.handle({
        resolve,
        reject,
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
      })
    })
  }

  // consume callbacks
  resolve(value) {
    if (value && typeof value === 'object' || typeof value === 'function') {
      const then = value.then
      if (typeof then === 'function') {
        then.call(value, this.resolve.bind(this), this.reject.bind(this))
      }

    } else {
      this.state = FULFILLED
      this.value = value
      this.callbacks.forEach(cb => this.handle(cb))
    }
  }

  reject(error) {
    this.state = REJECTD
    this.value = error
    this.callbacks.forEach(cb => this.handle(cb))
  }

  handle(callback) {
    if (this.state === PENDING) {
      this.callbacks.push(callback)

    } else {
      const cb = this.state === FULFILLED ? callback.onFulfilled : callback.onRejected
      const rs = this.state === FULFILLED ? callback.resolve : callback.reject

      if (!cb) {
        rs(this.value)
      } else {
        let result
        try {
          result = cb(this.value)
        } catch (error) {
          result = error
          rs = callback.reject
        } finally {
          rs(result)
        }
      }
    }
  }

  catch(onError) {
    return this.then(null, onError)
  }

  finally(onDone) {
    if (typeof onDone !== 'function') {
      return this.then()

    } else {
      return this.then(
        value => ForgePromise.resolve(onDone()).then(() => value),
        reason => ForgePromise.reject(onDone()).then(() => { throw reason }),
      )
    }
  }

  static resolve(value) {
    if (value && value instanceof ForgePromise) {
      return value
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new ForgePromise(resolve => {
        then(resolve)
      })

    } else if (value) {
      return new ForgePromise(resolve => resolve(value))
    } else {
      return new ForgePromise(resolve => resolve())
    }
  }

  static all(promises) {
    return new ForgePromise((resolve, reject) => {
      let fulfilledCount = 0
      const promiseCount = promises.length
      const results = Array.from({ length: promiseCount })
      promises.forEach((promise, index) => {
        ForgePromise.resolve(promise).then(result => {
          fulfilledCount++
          results[index] = result
          if (fulfilledCount === promiseCount) {
            resolve(results)
          }
        }, reason => reject(reason))
      })
    })
  }

  static race(promises) {
    return new ForgePromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        ForgePromise.resolve(promises[i]).then(value => {
          resolve(value)
        }, reason => reject(reason))
      }
    })
  }
}
