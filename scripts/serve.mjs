import {createServer} from 'node:http';
import {readFile, stat, realpath} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
const root = resolve(import.meta.dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.wasm':'application/wasm','.md':'text/plain; charset=utf-8'};
const allowed = new Set(['index.html','assets','fundamentals','mechanisms','tooling','examples','docs']);
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) parts.push('index.html');
    if (!allowed.has(parts[0]) || parts.some(part => part.startsWith('.') || part === 'node_modules')) {
      res.writeHead(403).end('Not a public example'); return;
    }
    let file = resolve(root, ...parts);
    if (parts.join('/') === 'mechanisms/router/dist/about') file = resolve(root, 'mechanisms/router/dist/index.html');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    file = await realpath(file);
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(body);
  } catch { res.writeHead(404).end('Example not found'); }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log('Learning index: http://127.0.0.1:' + (process.env.PORT || 4173)));
