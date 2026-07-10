#!/bin/sh
set -eu

profile_uuid='3fa0d6b7-229d-4b0b-866b-253b0483427f'
profile_path="/org/gnome/terminal/legacy/profiles:/:$profile_uuid/"
profiles_key='/org/gnome/terminal/legacy/profiles:/list'
script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
profile_file="$script_dir/sageveil.dconf"

if ! command -v dconf >/dev/null 2>&1; then
  echo 'dconf is required to install the GNOME Terminal Sageveil profile.' >&2
  exit 1
fi

if [ ! -r "$profile_file" ]; then
  echo "Profile data not found: $profile_file" >&2
  exit 1
fi

profiles=$(dconf read "$profiles_key")
case "$profiles" in
  *"'$profile_uuid'"*) updated_profiles=$profiles ;;
  ''|'[]'|'@as []') updated_profiles="['$profile_uuid']" ;;
  *']') updated_profiles="${profiles%]}, '$profile_uuid']" ;;
  *)
    echo "Unexpected GNOME Terminal profile list: $profiles" >&2
    exit 1
    ;;
esac

dconf load "$profile_path" < "$profile_file"
if [ "$updated_profiles" != "$profiles" ]; then
  dconf write "$profiles_key" "$updated_profiles"
fi

echo 'Installed profile: Sageveil.'
echo 'Select “Sageveil” in GNOME Terminal Preferences → your profile list.'
