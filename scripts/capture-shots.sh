#!/usr/bin/env bash
# Capture a screenshot of one mini's live site into public/shots/<id>/.
#
#   ./scripts/capture-shots.sh <mini id> <url> [name]
#
# Example:
#   ./scripts/capture-shots.sh click-tooling https://clicktooling.com/ home
#
# Then look at the PNG and only wire it into src/data/minis.ts if it is
# worth showing. Many of these sites put a sign-in wall on the front door,
# so check the file before you trust it.

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

id="${1:-}"
url="${2:-}"
name="${3:-home}"

if [[ -z "$id" || -z "$url" ]]; then
  echo "usage: $0 <mini id> <url> [name]" >&2
  exit 64
fi

if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome not found at $CHROME" >&2
  exit 69
fi

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/public/shots/$id"
mkdir -p "$out"

"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1280,800 \
  --virtual-time-budget=9000 \
  --screenshot="$out/$name.png" \
  "$url" >/dev/null 2>&1

echo "wrote public/shots/$id/$name.png"
echo "reference it as /shots/$id/$name.png"
