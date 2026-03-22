import { sageveil } from '@sageveil/palette';
import { Eta } from 'eta';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const TEMPLATE_EXTENSION = '.eta';
const EXECUTABLE_MODE = 0o755;
const REGULAR_FILE_MODE = 0o644;
const FILE_ENCODING = 'utf8';

/**
 * Configuration options for rendering a single template file.
 */
export type RenderFileOptions = {
  /** The template filename (relative to template directory) */
  filename: string;
  /** Whether the output file should have executable permissions (755 vs 644) */
  executable?: boolean;
};

/**
 * Configuration for a template rendering job.
 */
export type RenderJob = {
  /** Directory containing template files */
  templateDir: string;
  /** Array of template files to render, can be strings or RenderFileOptions */
  templateFiles: (RenderFileOptions | string)[];
  /** Extra context merged into template data alongside the sageveil palette */
  ctx?: Record<string, unknown>;
};

const OUTPUT_DIR = process.env.OUTPUT_DIR || '';

if (!OUTPUT_DIR || OUTPUT_DIR === '') {
  console.error(
    "$OUTPUT_DIR environment variable is required. Check target settings in project's nx configuration.",
  );
  process.exit(1);
}

/** Renders template files from a RenderJob and writes output to $OUTPUT_DIR. */
export async function render(job: RenderJob): Promise<void> {
  const eta = new Eta({ views: job.templateDir, autoTrim: false });
  await mkdir(OUTPUT_DIR, { recursive: true });
  const results = await Promise.allSettled(
    job.templateFiles.map((file) => renderFile(eta, file, job.ctx)),
  );

  const failures = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result.status === 'rejected')
    .map(({ result, index }) => ({
      reason: (result as PromiseRejectedResult).reason,
      file: job.templateFiles[index],
    }));

  failures.forEach(({ reason, file }) => {
    const fileName = typeof file === 'string' ? file : file.filename;
    console.error(`Failed to render template "${fileName}":`, reason);
  });

  if (failures.length) process.exit(1);
}

async function renderFile(
  eta: Eta,
  file: RenderFileOptions | string,
  ctx?: Record<string, unknown>,
): Promise<void> {
  const { filename, executable } = normalizeFileOptions(file);
  const renderedContent: string = await eta.renderAsync(filename, {
    ...sageveil,
    ...ctx,
  });
  const outputFilename = filename.endsWith(TEMPLATE_EXTENSION)
    ? filename.slice(0, -TEMPLATE_EXTENSION.length)
    : filename;
  const outputPath = join(OUTPUT_DIR, outputFilename);
  const outputDirectory = dirname(outputPath);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, renderedContent, {
    encoding: FILE_ENCODING,
    mode: executable ? EXECUTABLE_MODE : REGULAR_FILE_MODE,
  });
}

function normalizeFileOptions(
  file: RenderFileOptions | string,
): RenderFileOptions {
  return typeof file === 'string'
    ? {
        filename: file,
        executable: false,
      }
    : file;
}
