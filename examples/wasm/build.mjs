import { spawnSync } from 'node:child_process';
import { mkdir, copyFile } from 'node:fs/promises';
for (const args of [
  ['test', '--locked', '--manifest-path', 'rust/Cargo.toml'],
  [
    'build',
    '--locked',
    '--manifest-path',
    'rust/Cargo.toml',
    '--release',
    '--target',
    'wasm32-unknown-unknown',
  ],
]) {
  const result = spawnSync('cargo', args, {
    cwd: import.meta.dirname,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
await mkdir(new URL('public/', import.meta.url), { recursive: true });
await copyFile(
  new URL(
    'rust/target/wasm32-unknown-unknown/release/latte_add.wasm',
    import.meta.url,
  ),
  new URL('public/add.wasm', import.meta.url),
);
