#!/bin/bash

# End script on any error
set -e

# Pass AWS SSH key from github actions env variables to keyfile on runner
echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
SSH="ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME}"

# SSH onto EC2, pull latest main branch and deploy
$SSH << EOF
    export DJANGO_AWS_ACCESS_KEY_ID="$DJANGO_AWS_ACCESS_KEY_ID" &&
    export DJANGO_AWS_SECRET_ACCESS_KEY="$DJANGO_AWS_SECRET_ACCESS_KEY" &&
    export DJANGO_AWS_STORAGE_BUCKET_NAME="$DJANGO_AWS_STORAGE_BUCKET_NAME" &&
    cd app &&
    git checkout main &&
    git fetch --all &&
    git reset --hard origin/main &&
    git pull origin main &&
    docker-compose -f docker-production.yaml up -d --build
EOF
