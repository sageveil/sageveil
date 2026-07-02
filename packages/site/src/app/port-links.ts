const DEFAULT_REPO_URL = 'https://github.com/sageveil/sageveil';

export interface PortLinks {
  codeUrl: string;
  releaseUrl?: string;
  downloadUrl?: string;
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const parseGithubRepo = (repoUrl: string) => {
  try {
    const parsed = new URL(repoUrl);
    if (parsed.hostname !== 'github.com') {
      return null;
    }

    const [owner, repo] = parsed.pathname.replace(/^\/|\/$/g, '').split('/');
    if (!owner || !repo) {
      return null;
    }

    return { owner, repo };
  } catch {
    return null;
  }
};

export function buildPortLinks(input: {
  repoUrl?: string;
  slug: string;
  version: string;
}): PortLinks {
  const resolvedRepoUrl = trimTrailingSlash(input.repoUrl ?? DEFAULT_REPO_URL);
  const githubRepo = parseGithubRepo(resolvedRepoUrl);
  const isDefaultMonorepo = resolvedRepoUrl === DEFAULT_REPO_URL;
  const owner = githubRepo?.owner ?? 'sageveil';
  const repoBase = `https://github.com/${owner}/${input.slug}`;
  const tag = `v${input.version}`;

  return {
    codeUrl: isDefaultMonorepo
      ? `${resolvedRepoUrl}/tree/main/packages/ports/${input.slug}`
      : repoBase,
    releaseUrl: `${repoBase}/releases/tag/${tag}`,
    downloadUrl: `${repoBase}/releases/download/${tag}/sageveil-${input.slug}-${input.version}.zip`,
  };
}

export const defaultRepoUrl = DEFAULT_REPO_URL;
