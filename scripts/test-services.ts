import { spawn } from 'node:child_process';
import { application } from '../tests/api/fixture.ts';
import { createBasicServer } from '../examples/graphql-http/server.js';
import { createNetworkServer } from '../examples/network/server.js';
const basic = createBasicServer(),
  network = createNetworkServer();
const app = await application(4000);
await Promise.all([
  new Promise<void>((resolve) => basic.listen(4001, '127.0.0.1', resolve)),
  new Promise<void>((resolve) => network.listen(4002, '127.0.0.1', resolve)),
]);
// The static server is the readiness endpoint, so start it after API initialization.
const staticServer = spawn(process.execPath, ['scripts/serve.mjs'], {
  stdio: 'inherit',
});
let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  staticServer.kill('SIGTERM');
  await app.dispose();
  basic.close();
  network.close();
  process.exit(0);
}
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, close);
staticServer.once('exit', close);
