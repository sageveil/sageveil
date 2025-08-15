import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: [
    'colors/sageveil.lua',
    'lua/lualine/themes/sageveil-alt.lua',
    'lua/lualine/themes/sageveil.lua',
    'lua/sageveil/config.lua',
    'lua/sageveil/palette.lua',
    'lua/sageveil.lua',
  ],
});
