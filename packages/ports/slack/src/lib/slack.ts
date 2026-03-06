import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: ['sageveil.css.eta', 'sageveil.theme.eta'],
});
