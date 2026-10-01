import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { openDatabase } from '../src/db.ts';
export async function seed(databaseUrl: string) {
  const db = openDatabase(databaseUrl);
  try {
    const password = await bcrypt.hash('Learning-only-123!', 10);
    const user = await db.user.upsert({
      where: { email: 'reader@example.test' },
      update: {},
      create: {
        id: 'seed-reader',
        name: 'Demo Reader',
        email: 'reader@example.test',
        password,
      },
    });
    const links = [
      // Site names read the same on the English and the Chinese page.
      ['https://developer.mozilla.org/', 'MDN'],
      ['https://graphql.org/learn/', 'GraphQL'],
      ['https://react.dev/', 'React'],
      ['https://www.prisma.io/docs/', 'Prisma'],
    ];
    for (const [index, [url, description]] of links.entries())
      await db.link.upsert({
        where: { id: 'seed-link-' + index },
        update: {},
        create: {
          id: 'seed-link-' + index,
          url,
          description,
          postedById: user.id,
          createdAt: new Date(Date.UTC(2026, 0, index + 1)),
        },
      });
  } finally {
    await db.$disconnect();
  }
}
if (process.argv[1]?.endsWith('/seed.ts'))
  await seed(process.env.DATABASE_URL || 'file:./data/dev.db');
