module.exports = {
  'flake.nix': ['nix fmt'],
  '.github/workflows/*.{yml,yaml}': ['yamlfmt'],
  'packages/ports/nvim/templates/**/*.lua': ['stylua'],
  '{packages,tools}/**/*.{js,ts,jsx,tsx}': ['oxlint --fix', 'oxfmt --write'],
  '{packages,tools}/**/*.json': ['oxfmt --write'],
};
