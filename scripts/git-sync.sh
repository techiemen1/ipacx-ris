#!/bin/bash

set -e

BRANCH=$(git branch --show-current)

if [[ -z $(git status --porcelain) ]]; then
  echo "No changes to sync."
  exit 0
fi

git add .

git commit -m "auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"

echo "Committed locally on branch $BRANCH"
echo "Run 'git push' when ready."
