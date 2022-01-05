#!/bin/bash

# End script on any error
set -e
# End script on unset variable error
set -u

# Pass AWS SSH key from github actions env variables to keyfile on runner
echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
SSH="ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME}"
echo "USER_NAME: $USER_NAME"
echo "HOSTNAME: $HOSTNAME"
echo "DJANGO_AWS_STORAGE_BUCKET_NAME: $DJANGO_AWS_STORAGE_BUCKET_NAME"
# SSH onto EC2, pull latest main branch and deploy
if [ -n "${DJANGO_AWS_STORAGE_BUCKET_NAME-a}" ]; then
  echo >&2 "Fatal error: DJANGO_AWS_STORAGE_BUCKET_NAME not set"
  exit 2
fi

$SSH << EOF
    export DJANGO_AWS_ACCESS_KEY_ID="$DJANGO_AWS_ACCESS_KEY_ID"
    export DJANGO_AWS_SECRET_ACCESS="$DJANGO_AWS_SECRET_ACCESS_KEY"
    export DJANGO_AWS_STORAGE_BUCKET_NAME="$DJANGO_AWS_STORAGE_BUCKET_NAME"
    cd app &&
    git checkout main &&
    git fetch --all &&
    git reset --hard origin/main &&
    git pull origin main &&
    docker-compose -f docker-production.yaml up -d --build
EOF
