<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/nvim</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/nvim-preview.png" width="90%" />
</p>

# @sageveil/nvim

## Overview

The sageveil neovim port provides a full Lua colorscheme, Tree‑sitter highlights, semantic token support, and two lualine themes.

## Get the plugin

### Prebuilt releases

Install the colorscheme directly from <https://github.com/sageveil/nvim>. The repository hosts tags and release assets that track the upstream palette.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the runtime files: `pnpm nx run nvim:generate` 
3. The files land in `dist/ports/nvim/`

## Apply sageveil

If you use a plugin manager, point it at the dedicated repo (or the build output if you're working inside the monorepo). Example for [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
---@module "lazy"
---@type LazySpec
return {
  {
    "sageveil/nvim",
    -- If you're working from the monorepo, swap this for: dir = "~/repos/sageveil/dist/ports/nvim/"
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
