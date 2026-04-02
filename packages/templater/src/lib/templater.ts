import { sageveil } from '@sageveil/palette';
import { Eta } from 'eta';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

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
  /** Array of template files to render. When omitted, all files in templateDir are rendered. */
  templateFiles?: (RenderFileOptions | string)[];
  /** Extra context merged into template data alongside the sageveil palette */
  ctx?: Record<string, unknown>;
  /** Output directory for rendered files. Falls back to $OUTPUT_DIR env var. */
  outputDir?: string;
};

function resolveOutputDir(explicit?: string): string {
  const outputDir = explicit ?? process.env.OUTPUT_DIR;
  if (!outputDir) {
    throw new Error(
      "outputDir is required: pass it in RenderJob or set $OUTPUT_DIR. Check target settings in project's nx configuration.",
    );
  }
  return outputDir;
}

/** Discovers all files in a directory recursively, returning paths relative to the directory. */
export async function discoverTemplates(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();
}

/** Renders template files from a RenderJob and writes output to the resolved output directory. */
export async function render(job: RenderJob): Promise<void> {
  const outputDir = resolveOutputDir(job.outputDir);
  const templateFiles =
    job.templateFiles ?? (await discoverTemplates(job.templateDir));
  const eta = new Eta({ views: job.templateDir, autoTrim: false });
  await mkdir(outputDir, { recursive: true });
  const results = await Promise.allSettled(
    templateFiles.map((file) => renderFile(eta, outputDir, file, job.ctx)),
  );

  const failures = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result.status === 'rejected')
    .map(({ result, index }) => ({
      reason: (result as PromiseRejectedResult).reason,
      file: templateFiles[index],
    }));

  failures.forEach(({ reason, file }) => {
    const fileName = typeof file === 'string' ? file : file.filename;
    console.error(`Failed to render template "${fileName}":`, reason);
  });

  if (failures.length) {
    throw new AggregateError(
      failures.map((f) => f.reason),
      'Template rendering failed',
    );
  }
}

async function renderFile(
  eta: Eta,
  outputDir: string,
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
  const outputPath = join(outputDir, outputFilename);
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
