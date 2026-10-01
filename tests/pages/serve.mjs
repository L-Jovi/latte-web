import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

// Serves _site/ from the root the way GitHub Pages does: no SPA fallback.
const root = resolve(process.argv[2] ?? '_site');
const prefix = '/';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wasm': 'application/wasm',
};
createServer(async (req, res) => {
  const path = decodeURIComponent(
    new URL(req.url, 'http://localhost').pathname,
  );
  if (!path.startsWith(prefix)) return res.writeHead(404).end();
  let file = resolve(root, path.slice(prefix.length));
  if (file !== root && !file.startsWith(root + sep))
    return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(4190, '127.0.0.1', () =>
  console.log(`Pages preview: http://127.0.0.1:4190${prefix}`),
);
