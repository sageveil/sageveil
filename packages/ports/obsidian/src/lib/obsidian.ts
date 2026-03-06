import { render } from '@sageveil/templater';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const { version } = JSON.parse(
  readFileSync(join(import.meta.dirname, '..', '..', 'package.json'), 'utf8')
);

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: ['sageveil.css.eta', 'manifest.json.eta'],
  ctx: { version },
});
