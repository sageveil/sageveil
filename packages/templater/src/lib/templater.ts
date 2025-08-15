import { sageveil } from '@sageveil/palette';
import { Eta } from 'eta';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export type RenderJob = {
  templateDir: string;
  templateFiles: string[];
  ctx?: Record<string, unknown>;
};

const outputDir = process.env.OUTPUT_DIR || '';

if (!outputDir || outputDir === '') {
  console.error(
    "$OUTPUT_DIR environment variable is requied. Check target settings in project's nx configuration."
  );
  process.exit(1);
}

/**
 * Renders template files using the Eta templating engine.
 *
 * @param job - The render job configuration
 * @param job.templateDir - Directory containing template files
 * @param job.templateFiles - Array of template file names to render
 * @param job.ctx - Optional context object for template rendering (currently unused)
 * @returns Promise that resolves when all template files have been processed
 *
 * @example
 * ```typescript
 * await render({
 *   templateDir: './templates',
 *   templateFiles: ['index.html.eta', 'styles.css.eta'],
 *   ctx: { title: 'My App' }
 * });
 * ```
 */
export async function render(job: RenderJob) {
  const eta = new Eta({ views: job.templateDir });
  await mkdir(outputDir, { recursive: true });
  const results = await Promise.allSettled(
    job.templateFiles.map((f) => renderFile(eta, f))
  );

  const failures = results
    .filter((f) => f.status === 'rejected')
    .map((f) => f.reason);

  failures.forEach((f) => console.error(f));

  if (failures.length) process.exit(1);
}

/**
 * Renders a single template file and writes it to the output directory.
 *
 * @param eta - The Eta templating engine instance
 * @param filename - Name of the template file to render (relative to template directory)
 * @returns Promise that resolves when the file has been rendered and written
 *
 * @internal
 */
async function renderFile(eta: Eta, filename: string) {
  const tpl = await eta.renderAsync(filename, {
    ...sageveil,
  });
  const outpath = join(outputDir, filename.replace(/\.eta$/, ''));
  const dir = dirname(outpath);
  await mkdir(dir, { recursive: true });
  await writeFile(outpath, tpl as string, 'utf8');
}
