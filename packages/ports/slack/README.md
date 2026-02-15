<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/slack</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme</p>

# @sageveil/slack

## Usage

1. Open Slack.
2. In `Preferences`, go to `Themes` > `Create a custom theme`.
3. Generate the files with `pnpm nx run slack:generate`.
4. Copy the contents of `dist/ports/slack/sageveil.theme` into `Custom theme`.
5. To style the main content area, use a CSS injector and load `sageveil.css`.

## Build from source

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run slack:generate`
3. Generated files are written to `dist/ports/slack/`

## Generated files

- `sageveil.theme` - Slack custom theme colors generated from the shared palette
- `sageveil.css` - optional CSS injector stylesheet for deeper UI theming

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/slack](https://github.com/sageveil/slack) is used only for easy distribution of the ready-to-use slack colorscheme.
