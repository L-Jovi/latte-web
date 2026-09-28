import less from 'less';
import { glob, readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
for await (const file of glob('*/*.less')) {
  const result = await less.render(await readFile(file, 'utf8'), {
    filename: file,
    math: 'parens-division',
  });
  const target = 'dist/' + file.replace(/\.less$/, '.css');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, result.css);
}
