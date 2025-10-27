import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: [{ filename: 'sageveil.tmux', executable: true }],
});
