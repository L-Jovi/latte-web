import _ from 'lodash'

function component() {
  var element = document.createElement('div');

  _.join(['index', 'module', 'loaded!'], '+')

  return element;
}

document.body.appendChild(component());
