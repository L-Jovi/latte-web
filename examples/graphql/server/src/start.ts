import 'dotenv/config';
import { createApplication } from './server.ts';
const app = await createApplication({
  databaseUrl: process.env.DATABASE_URL || 'file:./data/dev.db',
  secret: process.env.APP_SECRET || '',
  port: Number(process.env.PORT || 4000),
});
console.log('Apollo HTTP and graphql-ws: ' + app.url);
for (const signal of ['SIGINT', 'SIGTERM'])
  process.once(signal, async () => {
    await app.close();
    process.exit(0);
  });
