module.exports = {
  'flake.nix': ['nix fmt'],
  '.github/workflows/*.{yml,yaml}': ['yamlfmt'],
  'packages/ports/nvim/templates/**/*.lua': ['stylua'],
  '{packages,tools}/**/*.{js,ts,jsx,tsx,json}': [
    'esling --fix',
    'prettier --write',
  ],
};
