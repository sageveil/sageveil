import { default as nxScopes } from '@commitlint/config-nx-scopes';

const config = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'scope-enum': async (ctx) => [
      2,
      'always',
      [...nxScopes.utils.getProjects(ctx), 'release'],
    ],
  },
};

export default config;
