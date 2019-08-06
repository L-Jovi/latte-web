const parent = document.getElementsByClassName('parent')[0]
parent.addEventListener('click', (e) => {
    console.log('fire parent')
})

const child = document.getElementsByClassName('child')[0]
child.addEventListener('click', (e) => {
    console.log('fire child')
    e.stopImmediatePropagation()
})
