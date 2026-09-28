function component() {
  const element = document.createElement('div');
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());

// ProvidePlugin injects join; native fetch needs no shim in the supported browsers.
