import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: [
    'sageveil.fish',
    'sageveil.nix',
    'sageveil.ps1',
    'sageveil.sh',
  ],
});
