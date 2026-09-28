const $inner = document.querySelector('#inner')
const $outer = document.querySelector('#outer')

function handler () {
  console.log('click') // Synchronous listener

  Promise.resolve().then(_ => console.log('promise')) // Queue a microtask

  setTimeout(_ => console.log('timeout')) // Schedule a timer task

  requestAnimationFrame(_ => console.log('animationFrame')) // Before a rendering opportunity, not a timer task

  $outer.setAttribute('data-random', Math.random()) // Mutation delivery occurs at a microtask checkpoint
}

new MutationObserver(_ => {
  console.log('observer')
}).observe($outer, {
  attributes: true
})

$inner.addEventListener('click', handler)
$outer.addEventListener('click', handler)
