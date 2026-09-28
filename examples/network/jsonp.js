export function jsonp(url, { timeout = 3000 } = {}) {
  return new Promise((resolve, reject) => {
    const callback = 'latte_' + crypto.randomUUID().replaceAll('-', '');
    const script = document.createElement('script');
    const target = new URL(url);
    target.searchParams.set('callback', callback);
    function finish(error, value) {
      clearTimeout(timer);
      script.remove();
      delete window[callback];
      error ? reject(error) : resolve(value);
    }
    window[callback] = (value) => finish(null, value);
    script.onerror = () => finish(new Error('JSONP script failed'));
    const timer = setTimeout(
      () => finish(new Error('JSONP timed out')),
      timeout,
    );
    script.src = target.href;
    document.head.append(script);
  });
}
