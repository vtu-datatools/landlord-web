#!/bin/bash

# End script on any error
set -e
# End script on unset variable error
set -u

cd app 
git checkout main 
git fetch --all 
git reset --hard origin/main 
git pull origin main
docker-compose -f docker-production.yaml up -d --build