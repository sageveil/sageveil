<p align="center">
    <img src="../../../assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/nvim</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/nvim

## Overview

The sageveil neovim port provides a full Lua colorscheme, Tree‑sitter highlights, semantic token support, and two lualine themes.

## Build from the monorepo

All sageveil ports will be distributed in their dedicated repos (comming soon). Until then they must be built from source.

1. Install dependencies once: `pnpm install`
2. Render the runtime files: `pnpm nx run nvim:generate` (append `-- --skip-archive` to skip the `.tar.gz` bundle)
3. The files land in `dist/ports/nvim/<version>/`

Each build writes a manifest that lists SHA-256 hashes for every output.

## Apply Sageveil

If you use a plugin manager, point it at the dist directory. Example for [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
---@module "lazy"
---@type LazySpec
return {
  {
    -- "sageveil/nvim" (comming soon)
    dir = "~/repos/sageveil/dist/ports/nvim/0.1.0/",
    name = "sageveil",
    priority = 1000,
    config = function()
      require("sageveil").setup {
        style = {
          italic = true, -- default
          bold = true, -- default
        },
        overrides = {
          Comment = { fg = "blue" }, -- example override for Comment highlight group
        },
      }
      vim.cmd.colorscheme "sageveil"
    end,
  },
}

```

3. Optionally tweak `bold`, `italic`, or provide `overrides` to adjust highlight groups before calling `:colorscheme sageveil`.

The two lualine themes are available via `require("lualine").setup({ options = { theme = "sageveil" } })` (or `"sageveil-alt"`).

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/nvim](https://github.com/sageveil/nvim) is used only for easy distribution of the ready-to-use nvim colorscheme plugin.

