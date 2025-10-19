# Sageveil tmux port

Sageveil's tmux port renders a themed status line that matches the rest of the palette. It is distributed as a plain tmux config file so you can source it from any existing `tmux.conf`. You can either build it from this monorepo or consume a prebuilt artifact published in the port's standalone repository (link TBD).

## Get the theme

### Option 1: Use prebuilt artifacts

- Clone or download the dedicated tmux port repository (link TBD).
- Copy the published `sageveil.tmux` (and optional manifest) into your preferred tmux config directory, e.g. `~/.config/tmux/`.

### Option 2: Build from the Sageveil monorepo

- Install dependencies once with `pnpm install` in the repo root.
- Render the status line with `pnpm nx run tmux:generate`. The build script writes the theme and a manifest to `dist/ports/tmux/<version>/`.
- Add `-- --skip-archive` if you do not need the generated tarball.


## Use inside tmux

```tmux
# Set any overrides before sourcing the theme
set -g @sv_show_user "on"
set -g @sv_window_idx_name_separator " • "

# Source the generated status line
source-file "/path/to/sageveil.tmux"
```

Most people copy or symlink the generated file into `~/.config/tmux/sageveil.tmux`, then source it from their main config. Reload tmux with `tmux source-file ~/.tmux.conf` after changes.

## Configuration reference

All options are standard tmux global options. Set them **before** you source `sageveil.tmux` so the template can pick up your changes.

### Segment toggles

| Option | Default | Description |
| --- | --- | --- |
| `@sv_show_session` | `on` | Shows the current session name (`#S`) on the left. |
| `@sv_show_prefix_indicator` | `on` | Adds the prefix icon whenever the tmux prefix is pressed. |
| `@sv_show_zoom_indicator` | `on` | Highlights zoomed panes (prefix + `z`). |
| `@sv_show_session_count` | `"" (off)` | Displays the total number of server sessions. |
| `@sv_show_user` | `""` (off) | Set to `on` to show the current UNIX user on the right. |
| `@sv_show_host` | `""` (off) | Set to `on` to show the hostname on the right. |
| `@sv_show_date_time` | `""` (off) | Set to `on` to render the clock segment. |
| `@sv_show_directory` | `""` (off) | Set to `on` to display the active pane's working directory. |
| `@sv_directory_as_window_name` | `""` (off) | Set to `on` to use the active pane directory as the window title. |
| `@sv_only_windows` | `""` (off) | Set to `on` to hide the left/right status bars and show only the window list. |

### Formatting and layout

| Option | Default | Description |
| --- | --- | --- |
| `@sv_date_time_format` | `%H:%M %d %b` | Format string fed to the clock segment. |
| `@sv_window_idx_name_separator` | `:` | Separator between the window index (`#I`) and name (`#W`). |
| `@sv_window_segments_separator` | double space | Separator placed between each window segment. |
| `@sv_left_separator` | single space | Glue used to join items in the left status line. |
| `@sv_right_separator` | single space | Glue used to join items in the right status line. |

### Integration hooks

| Option | Default | Description |
| --- | --- | --- |
| `@sv_status_left_prepend_section` | `""` | Prepends raw tmux status text to the left side (runs before Sageveil segments). |
| `@sv_status_left_append_section` | `""` | Appends raw tmux status text after the Sageveil left segments. |
| `@sv_status_right_prepend_section` | `""` | Prepends raw tmux status text to the right side. |
| `@sv_status_right_append_section` | `""` | Appends raw tmux status text after the Sageveil right segments. |

### Icon glyphs

These defaults assume a Nerd Font. Override any entry if your terminal font maps different glyphs.

| Option | Default glyph | Purpose |
| --- | --- | --- |
| `@sv_session_icon` | `󰕰` | Session segment icon. |
| `@sv_window_count_icon` | `󰕢` | Server session count indicator. |
| `@sv_username_icon` | `` | Username indicator on the right side. |
| `@sv_hostname_icon` | `󰒋` | Hostname indicator. |
| `@sv_date_time_icon` | `󰃰` | Clock segment icon. |
| `@sv_folder_icon` | `` | Active directory indicator. |
| `@sv_prefix_icon` | `󰘳` | Prefix active indicator. |
| `@sv_zoom_icon` | `󰁌` | Zoomed pane indicator. |

