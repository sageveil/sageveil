import {
  createLocalBashOperations,
  getAgentDir,
  type ExtensionAPI,
} from '@earendil-works/pi-coding-agent';
import { truncateToWidth, visibleWidth } from '@earendil-works/pi-tui';
import { sageveil } from '@sageveil/palette';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const ansi = (hex: string) =>
  hex.slice(1).match(/../g)!.map((part) => Number.parseInt(part, 16)).join(';');
const piIcon =
  `\x1b[38;2;${ansi(sageveil.ansi.base.black)};48;2;${ansi(sageveil.ansi.base.magenta)}m π \x1b[49;38;2;${ansi(sageveil.ansi.base.magenta)}m\x1b[39m`;
const formatTokens = (tokens: number) => {
  if (tokens < 1000) return tokens.toString();
  if (tokens < 10_000) return `${(tokens / 1000).toFixed(1)}k`;
  if (tokens < 1_000_000) return `${Math.round(tokens / 1000)}k`;
  if (tokens < 10_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  return `${Math.round(tokens / 1_000_000)}M`;
};

type StatuslineConfig = {
  icon: boolean;
  directory: boolean;
  gitBranch: boolean;
  gitStatus: boolean;
  context: boolean | 'auto';
  model: boolean;
  usage: boolean;
  extensionStatuses: boolean;
};

type SageveilConfig = {
  statusline: StatuslineConfig;
};

const defaults: SageveilConfig = {
  statusline: {
    icon: true,
    directory: true,
    gitBranch: true,
    gitStatus: true,
    context: 'auto',
    model: true,
    usage: false,
    extensionStatuses: true,
  },
};

const readConfig = async (): Promise<{ config: SageveilConfig; warning?: string }> => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(join(getAgentDir(), 'sageveil.json'), 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT')
      return { config: defaults };
    return { config: defaults, warning: 'sageveil: invalid sageveil.json; using defaults' };
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { config: defaults, warning: 'sageveil: invalid sageveil.json; using defaults' };
  }

  const values = parsed as Record<string, unknown>;
  let invalid = false;
  const boolean = (value: unknown, fallback: boolean) => {
    if (value === undefined) return fallback;
    if (typeof value === 'boolean') return value;
    invalid = true;
    return fallback;
  };
  const statusline =
    values.statusline === undefined
      ? {}
      : values.statusline && typeof values.statusline === 'object' && !Array.isArray(values.statusline)
        ? values.statusline as Record<string, unknown>
        : (invalid = true, {});
  const statuslineDefaults = defaults.statusline;
  const context = statusline.context;
  if (context !== undefined && context !== true && context !== false && context !== 'auto')
    invalid = true;

  return {
    config: {
      statusline: {
        icon: boolean(statusline.icon, statuslineDefaults.icon),
        directory: boolean(statusline.directory, statuslineDefaults.directory),
        gitBranch: boolean(statusline.gitBranch, statuslineDefaults.gitBranch),
        gitStatus: boolean(statusline.gitStatus, statuslineDefaults.gitStatus),
        context: context === true || context === false || context === 'auto'
          ? context
          : statuslineDefaults.context,
        model: boolean(statusline.model, statuslineDefaults.model),
        usage: boolean(statusline.usage, statuslineDefaults.usage),
        extensionStatuses: boolean(
          statusline.extensionStatuses,
          statuslineDefaults.extensionStatuses,
        ),
      },
    },
    ...(invalid && {
      warning: 'sageveil: invalid sageveil.json fields; using defaults for those fields',
    }),
  };
};

const emptyGitStatus = () => ({
  untracked: 0,
  modified: 0,
  renamed: 0,
  deleted: 0,
  staged: 0,
  stashed: 0,
  ahead: 0,
  behind: 0,
});

const parseGitStatus = (output: string) => {
  const status = emptyGitStatus();

  for (const line of output.split('\n')) {
    if (line.startsWith('# branch.ab ')) {
      const match = line.match(/\+(\d+) -(\d+)/);
      status.ahead = Number(match?.[1] ?? 0);
      status.behind = Number(match?.[2] ?? 0);
    } else if (line.startsWith('# stash ')) {
      status.stashed = Number(line.slice(8));
    } else if (line.startsWith('? ')) {
      status.untracked++;
    } else if (line.startsWith('1 ') || line.startsWith('2 ')) {
      const [index = '.', workingTree = '.'] = line.split(' ')[1] ?? '..';
      if (index !== '.') status.staged++;
      if (index === 'R' || workingTree === 'R') status.renamed++;
      else if (index === 'D' || workingTree === 'D') status.deleted++;
      else if (workingTree !== '.') status.modified++;
    }
  }

  return status;
};

export default function (pi: ExtensionAPI) {
  let gitRoot: string | undefined;
  let gitStatus = emptyGitStatus();
  let requestRender: (() => void) | undefined;

  const refreshGitStatus = async (cwd: string) => {
    if (!gitRoot) return;
    const result = await pi.exec(
      'git',
      ['status', '--porcelain=v2', '--branch', '--show-stash'],
      { cwd, timeout: 1000 },
    );
    if (result.code !== 0) return;
    const next = parseGitStatus(result.stdout);
    if (JSON.stringify(next) === JSON.stringify(gitStatus)) return;
    gitStatus = next;
    requestRender?.();
  };

  pi.on('tool_execution_end', async (_event, ctx) => {
    await refreshGitStatus(ctx.cwd);
  });

  pi.on('user_bash', (_event, ctx) => {
    const local = createLocalBashOperations();
    return {
      operations: {
        async exec(command, cwd, options) {
          const result = await local.exec(command, cwd, options);
          await refreshGitStatus(ctx.cwd);
          return result;
        },
      },
    };
  });

  pi.on('session_start', async (_event, ctx) => {
    const { config, warning } = await readConfig();
    if (warning) ctx.ui.notify(warning, 'warning');

    gitRoot = await pi
      .exec('git', ['rev-parse', '--show-toplevel'], {
        cwd: ctx.cwd,
        timeout: 1000,
      })
      .then((result) => (result.code === 0 ? result.stdout.trim() : undefined))
      .catch(() => undefined);
    await refreshGitStatus(ctx.cwd);

    ctx.ui.setFooter((tui, theme, footerData) => ({
      dispose: footerData.onBranchChange(() => tui.requestRender()),
      invalidate() {
        // Colors are resolved on every render, so there is no cache to clear.
      },
      render(width: number): string[] {
        requestRender = () => tui.requestRender();
        const separator = theme.fg('border', '  ');
        const branch = footerData.getGitBranch();
        const statuses = config.statusline.extensionStatuses
          ? Array.from(footerData.getExtensionStatuses().values())
          : [];
        const gitStatusText = [
          gitStatus.untracked && theme.fg('dim', `?${gitStatus.untracked}`),
          gitStatus.stashed && theme.fg('syntaxType', `$${gitStatus.stashed}`),
          gitStatus.modified && theme.fg('warning', `!${gitStatus.modified}`),
          gitStatus.renamed &&
            theme.fg('syntaxOperator', `»${gitStatus.renamed}`),
          gitStatus.deleted && theme.fg('error', `✘${gitStatus.deleted}`),
          gitStatus.staged && theme.fg('success', `+${gitStatus.staged}`),
          gitStatus.ahead && theme.fg('syntaxOperator', `⇡${gitStatus.ahead}`),
          gitStatus.behind &&
            theme.fg('customMessageLabel', `⇣${gitStatus.behind}`),
        ]
          .filter(Boolean)
          .join(' ');
        const left = [
          config.statusline.icon && piIcon,
          config.statusline.directory && theme.fg(
            'accent',
            `${gitRoot ? '󰊢' : '󰝰'} ${basename(gitRoot ?? ctx.cwd)}`,
          ),
          config.statusline.gitBranch && branch &&
            theme.fg('customMessageLabel', ` ${branch}`),
          config.statusline.gitStatus && gitStatusText,
        ]
          .filter(Boolean)
          .join(separator);

        const usage = ctx.getContextUsage();
        const context = usage
          ? `${usage.percent?.toFixed(1) ?? '?'}%/${formatTokens(usage.contextWindow)}`
          : '?%/?';
        const model = ctx.model?.id ?? 'no model';
        const right = [
          (config.statusline.context === true ||
            (config.statusline.context === 'auto' && (usage?.percent ?? 0) > 75)) &&
            theme.fg('muted', context),
          config.statusline.model && theme.fg(
            'dim',
            ctx.model?.reasoning
              ? `${model} • ${pi.getThinkingLevel()}`
              : model,
          ),
        ]
          .filter(Boolean)
          .join(separator);

        let detailLine = '';
        if (config.statusline.usage) {
          let input = 0;
          let output = 0;
          let cacheRead = 0;
          let cacheWrite = 0;
          let cost = 0;

          for (const entry of ctx.sessionManager.getEntries()) {
            if (entry.type !== 'message' || entry.message.role !== 'assistant')
              continue;
            const usage = entry.message.usage;
            input += usage.input;
            output += usage.output;
            cacheRead += usage.cacheRead;
            cacheWrite += usage.cacheWrite;
            cost += usage.cost.total;
          }

          const promptTokens = input + cacheRead + cacheWrite;
          const cacheHitRate = promptTokens
            ? (cacheRead / promptTokens) * 100
            : undefined;

          detailLine = theme.fg(
            'dim',
            [
              input && `↑${formatTokens(input)}`,
              output && `↓${formatTokens(output)}`,
              cacheRead && `R${formatTokens(cacheRead)}`,
              cacheWrite && `W${formatTokens(cacheWrite)}`,
              cacheHitRate !== undefined && `CH${cacheHitRate.toFixed(1)}%`,
              cost && `$${cost.toFixed(3)}`,
            ]
              .filter(Boolean)
              .join(' '),
          );
        }

        detailLine = truncateToWidth(detailLine, width);
        const statusLine = truncateToWidth(statuses.join(separator), width);

        if (!right) {
          return [truncateToWidth(left, width), detailLine, statusLine].filter(
            Boolean,
          );
        }

        if (visibleWidth(right) >= width) {
          return [truncateToWidth(right, width), detailLine, statusLine].filter(
            Boolean,
          );
        }

        const shortLeft = truncateToWidth(
          left,
          width - visibleWidth(right) - 1,
          '…',
        );
        const padding = ' '.repeat(
          width - visibleWidth(shortLeft) - visibleWidth(right),
        );
        return [shortLeft + padding + right, detailLine, statusLine].filter(
          Boolean,
        );
      },
    }));
  });
}
