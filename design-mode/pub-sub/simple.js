/*
 * @Description: subscribe event and publish to fire.
 * @FileName: pub-sub/simple.js
 * https://github.com/amandakelake/blog/issues/65
 */

class EventHub {
  constructor() {
    this.store = {}
  }

  on(event, handler) {
    if (!this.store[event]) {
      this.store[event] = []
    }

    this.store[event].push(handler)
  }

  emit(event, data) {
    const eventPool = this.store[event]
    if (eventPool) {
      for (let i = 0; i < eventPool.length; i++) {
        eventPool.handler(data)
      }
    }
  }

  off(event, handler) {
    const eventPool = this.store[event]
    if (eventPool) {
      const index =  eventPool.findIndex((h) => h === handler)
      if (index !== -1) {
        this.store[event].splice(index, 1)
      }
    }
  }
}
