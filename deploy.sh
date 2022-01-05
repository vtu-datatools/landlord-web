#!/bin/bash

# End script on any error
set -e
# End script on unset variable error
set -u

# Pass AWS SSH key from github actions env variables to keyfile on runner
echo "$PRIVATE_KEY" > private_key && chmod 600 private_key

SSH="ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME}"


$SSH << EOF
    cd app 
    git checkout main 
    git fetch --all 
    git reset --hard origin/main 
    git pull origin main 
    echo "DJANGO_AWS_ACCESS_KEY_ID="$DJANGO_AWS_ACCESS_KEY_ID"" >> app/.envs/.production/.django
    echo "DJANGO_AWS_SECRET_ACCESS="$DJANGO_AWS_SECRET_ACCESS"" >> app/.envs/.production/.django
    echo "DJANGO_AWS_STORAGE_BUCKET_NAME="$DJANGO_AWS_STORAGE_BUCKET_NAME"" >> app/.envs/.production/.django
    docker-compose -f docker-production.yaml up -d --build
EOF
