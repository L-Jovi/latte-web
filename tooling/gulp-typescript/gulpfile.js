import { series } from 'gulp';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { rm, mkdir, copyFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
export const clean = () => rm('dist', { recursive: true, force: true });
export function compile() {
  return spawn(process.execPath, [require.resolve('typescript/bin/tsc')], {
    stdio: 'inherit',
  });
}
export async function html() {
  await mkdir('dist', { recursive: true });
  await copyFile('src/index.html', 'dist/index.html');
}
export default series(clean, compile, html);
