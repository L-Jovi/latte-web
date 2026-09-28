import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { seed } from '../../examples/graphql/server/prisma/seed.ts';
import { createApplication } from '../../examples/graphql/server/src/server.ts';
export async function database() {
  const directory = await mkdtemp(join(tmpdir(), 'latte-graphql-'));
  const databaseUrl = 'file:' + join(directory, 'demo.db');
  try {
    await writeFile(join(directory, 'demo.db'), '', { flag: 'wx' });
    execFileSync(
      process.execPath,
      [resolve('node_modules/prisma/build/index.js'), 'migrate', 'deploy'],
      {
        cwd: resolve('examples/graphql/server'),
        env: { ...process.env, DATABASE_URL: databaseUrl },
        stdio: 'pipe',
      },
    );
    await seed(databaseUrl);
    return {
      databaseUrl,
      async remove() {
        await rm(directory, { recursive: true, force: true });
      },
    };
  } catch (error) {
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}
export async function application(port = 0) {
  const data = await database();
  try {
    const app = await createApplication({
      databaseUrl: data.databaseUrl,
      secret: 'test-only-secret-with-more-than-32-characters',
      port,
    });
    return {
      ...app,
      async dispose() {
        await app.close();
        await data.remove();
      },
    };
  } catch (error) {
    await data.remove();
    throw error;
  }
}
