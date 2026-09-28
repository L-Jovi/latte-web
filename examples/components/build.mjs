import { spawnSync } from 'node:child_process';
import {
  readdir,
  readFile,
  writeFile,
  copyFile,
  mkdir,
} from 'node:fs/promises';
for (const [command, args] of [
  ['vite', ['build']],
  ['vite', ['build', '--config', 'vite.library.config.js']],
  ['webpack', ['--config', 'webpack.config.cjs']],
  ['babel', ['src', '--out-dir', 'dist/babel', '--extensions', '.js,.jsx']],
]) {
  const run = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (run.status !== 0) process.exit(run.status || 1);
}
// Babel preserves the module graph; emitted imports must name the emitted .js files.
for (const file of await readdir('dist/babel'))
  if (file.endsWith('.js')) {
    const path = 'dist/babel/' + file;
    await writeFile(
      path,
      (await readFile(path, 'utf8')).replaceAll(".jsx'", ".js'"),
    );
  }
await copyFile('src/card.css', 'dist/babel/card.css');

const consumer = spawnSync(
  'vite',
  ['build', '--config', 'vite.consumer.config.js'],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);
if (consumer.status !== 0) process.exit(consumer.status || 1);

const stories = spawnSync('storybook', ['build', '--test'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: '1' },
});
if (stories.status !== 0) process.exit(stories.status || 1);
