# VTU
## Run Locally
One must first install:
* [Docker](https://docs.docker.com/get-docker/)
* [Postgres](https://www.postgresql.org/download/)
* [Python](https://www.python.org/downloads/)

## Python Setup
`pip install -r requirements/base.txt`
`pip install -r requirements/local.txt`
## Setup Environment Variables
Setup the environment variables in the following structure:
```
root
│   README.md
│   docker-local.yaml
|   docker-production.yaml
|   ...
|
└───.envs
    │
    └───.local
    │       .django
    │       .postgres
    │ 
    └───.production
            .django
            .postgres
```