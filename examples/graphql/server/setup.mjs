import { mkdir, writeFile, open } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
await mkdir(new URL('data/', import.meta.url), { recursive: true });
try {
  await writeFile(
    new URL('.env', import.meta.url),
    `DATABASE_URL=file:./data/dev.db
APP_SECRET=${randomBytes(32).toString('hex')}
PORT=4000
`,
    { flag: 'wx', mode: 0o600 },
  );
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
}

import { config } from 'dotenv';
import { resolve, dirname } from 'node:path';
config({ quiet: true });
const databaseUrl = process.env.DATABASE_URL || 'file:./data/dev.db';
if (!databaseUrl.startsWith('file:'))
  throw new Error('This example requires a local SQLite file');
const path = resolve(databaseUrl.slice(5));
await mkdir(dirname(path), { recursive: true });
// Initialize the file explicitly; append mode never truncates an existing database.
await (await open(path, 'a', 0o600)).close();
