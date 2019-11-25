const parent = document.getElementsByClassName('parent')[0]
parent.addEventListener('click', (e) => {
    console.log('fire parent')
})

const child = document.getElementsByClassName('child')[0]
child.addEventListener('click', (e) => {
    console.log('fire child')
    e.stopImmediatePropagation()    // the 2nd registed event cannot fire
    // e.stopPropagation()
})
child.addEventListener('click', (e) => {
    console.log('fire child 2nd event')
})


// event delegate
// with no need for alloc or destroy children node event
let ul = document.querySelector('#ul')
ul.addEventListener('click', (event) => {
    console.log(event.target)
    console.log(event.currentTarget)
})
