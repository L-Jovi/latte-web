const template = require('./index.handlebars')

document.addEventListener("DOMContentLoaded", () => {
  const data = {
    info: 'saber'
  }
  const html = template(data)

  document.getElementById("root").innerHTML = html
})
