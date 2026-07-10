<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/gnome-terminal</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/gnome-terminal

## Overview

Sageveil for GNOME Terminal is installed as an additional profile; it does not replace existing profiles or become the default.

## Get the theme

### Prebuilt releases

Download the generated files from <https://github.com/sageveil/gnome-terminal>.

### Build from the monorepo

```sh
pnpm nx run gnome-terminal:generate
```

The files land in `dist/ports/gnome-terminal/`.

## Install

From the generated directory:

```sh
chmod +x install.sh
./install.sh
```

Select the **Sageveil** profile in GNOME Terminal Preferences. The installer adds it to the existing profile list and leaves the default profile unchanged.

## Remove

This removes only the fixed Sageveil profile and its list entry:

```sh
uuid='3fa0d6b7-229d-4b0b-866b-253b0483427f'
key='/org/gnome/terminal/legacy/profiles:/list'
profiles=$(dconf read "$key")
case "$profiles" in
  "['$uuid']") updated='[]' ;;
  "@as ['$uuid']") updated='@as []' ;;
  *"'$uuid', "*) updated=$(printf '%s\n' "$profiles" | sed "s/'$uuid', //") ;;
  *", '$uuid']") updated=$(printf '%s\n' "$profiles" | sed "s/, '$uuid']/]/") ;;
  *) updated=$profiles ;;
esac
[ "$updated" = "$profiles" ] || dconf write "$key" "$updated"
dconf reset -f "/org/gnome/terminal/legacy/profiles:/:$uuid/"
```

## Testing status

This port has not yet been tested in GNOME Terminal. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. The downstream [sageveil/gnome-terminal](https://github.com/sageveil/gnome-terminal) repository distributes generated files.
