import { sageveil } from '@sageveil/palette';
import { Eta } from 'eta';
import { chmod, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const TEMPLATE_EXTENSION = '.eta';
const EXECUTABLE_MODE = 0o755;
const REGULAR_FILE_MODE = 0o644;
const FILE_ENCODING = 'utf8';

/**
 * @typedef {Object} RenderJob
 * @property {string} templateDir Directory containing template files
 * @property {string[]} [templateFiles] Template filenames (relative to templateDir). When omitted, all files in templateDir are rendered.
 * @property {Record<string, unknown>} [ctx] Extra context merged into template data alongside the sageveil palette
 * @property {string} [outputDir] Output directory for rendered files. Falls back to $OUTPUT_DIR env var.
 */

function resolveOutputDir(explicit) {
  const outputDir = explicit ?? process.env.OUTPUT_DIR;
  if (!outputDir) {
    throw new Error(
      "outputDir is required: pass it in RenderJob or set $OUTPUT_DIR. Check target settings in project's nx configuration.",
    );
  }
  return outputDir;
}

/** Discovers all files in a directory recursively, returning paths relative to the directory. */
export async function discoverTemplates(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();
}

/** Renders template files from a RenderJob and writes output to the resolved output directory. */
export async function render(job) {
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
      reason: result.reason,
      file: templateFiles[index],
    }));

  failures.forEach(({ reason, file }) => {
    console.error(`Failed to render template "${file}":`, reason);
  });

  if (failures.length) {
    throw new Error(JSON.stringify(failures.map((f) => f.reason)));
  }
}

async function renderFile(eta, outputDir, filename, ctx) {
  const renderedContent = await eta.renderAsync(filename, {
    ...sageveil,
    ...ctx,
  });
  const outputFilename = filename.endsWith(TEMPLATE_EXTENSION)
    ? filename.slice(0, -TEMPLATE_EXTENSION.length)
    : filename;
  const outputPath = join(outputDir, outputFilename);
  const outputDirectory = dirname(outputPath);
  await mkdir(outputDirectory, { recursive: true });
  // A shebang in the rendered output means the file is meant to be executed,
  // so it needs the exec bit.
  const mode = renderedContent.startsWith('#!')
    ? EXECUTABLE_MODE
    : REGULAR_FILE_MODE;
  await writeFile(outputPath, renderedContent, {
    encoding: FILE_ENCODING,
    mode,
  });
  // writeFile's `mode` only applies on creation; chmod makes the mode
  // deterministic when re-rendering over an existing file.
  await chmod(outputPath, mode);
}
