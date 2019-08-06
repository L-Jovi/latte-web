const parent = document.getElementsByClassName('parent')[0]
parent.addEventListener('click', (e) => {
    console.log('fire parent')
})

const child = document.getElementsByClassName('child')[0]
child.addEventListener('click', (e) => {
    console.log('fire child')
    e.stopImmediatePropagation()
})


// event delegate
// with no need for alloc or destroy children node event
let ul = document.querySelector('#ul')
ul.addEventListener('click', (event) => {
    console.log(event.target)
})
