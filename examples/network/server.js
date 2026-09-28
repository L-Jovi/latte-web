import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
export function createNetworkServer() {
  return createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (
      ['http://127.0.0.1:4173', 'http://localhost:4173'].includes(
        req.headers.origin,
      )
    ) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'GET') {
      res.writeHead(405).end();
      return;
    }
    const data = {
      message: 'Hello from the second origin',
      transport: url.pathname.slice(1),
    };
    if (url.pathname === '/jsonp') {
      const callback = url.searchParams.get('callback');
      // A callback is an identifier, never arbitrary JavaScript supplied by the caller.
      if (!/^[A-Za-z_$][\w$]{0,80}$/.test(callback || '')) {
        res.writeHead(400).end('Invalid callback');
        return;
      }
      res
        .writeHead(200, {
          'Content-Type': 'text/javascript',
          'X-Content-Type-Options': 'nosniff',
        })
        .end(`${callback}(${JSON.stringify(data)});`);
    } else if (['/data', '/slow'].includes(url.pathname)) {
      const timer = setTimeout(
        () =>
          res
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(data)),
        url.pathname === '/slow' ? 2000 : 0,
      );
      res.on('close', () => clearTimeout(timer));
    } else res.writeHead(404).end();
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  createNetworkServer().listen(4002, '127.0.0.1', () =>
    console.log('Network server: http://127.0.0.1:4002'),
  );
