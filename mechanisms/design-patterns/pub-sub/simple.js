// Original learning source: https://github.com/amandakelake/blog/issues/65
class EventHub {
  constructor() { this.store = new Map() }
  on(event, handler) {
    const pool = this.store.get(event) || []
    pool.push(handler)
    this.store.set(event, pool)
    return () => this.off(event, handler)
  }
  emit(event, data) {
    // Snapshot listeners so unsubscription during dispatch cannot skip a sibling.
    for (const handler of [...(this.store.get(event) || [])]) handler(data)
  }
  off(event, handler) {
    const pool = this.store.get(event)
    if (!pool) return
    const index = pool.indexOf(handler)
    if (index !== -1) pool.splice(index, 1)
    if (pool.length === 0) this.store.delete(event)
  }
}
