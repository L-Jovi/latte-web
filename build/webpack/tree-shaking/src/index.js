import { cube  } from './math.js'

function component() {
  const element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5),
  ]
  return element
}

document.body.appendChild(component())
