# VTU

Web app for Vancouver landlord data (current address: https://www.vanbelu.ga)

Stack:
* Frontend: React.js (Maps with leaflet)
* Backend: Django Rest API
* Database: Postgis (AWS RDS)
## Run Locally
One must first install:
* [Docker](https://docs.docker.com/get-docker/)
* [Postgres](https://www.postgresql.org/download/)
* [Python](https://www.python.org/downloads/)

## Python Setup
`pip install -r requirements/base.txt`
#### Local Development Requirements:
`pip install -r requirements/local.txt`
#### Production requirements:
`pip install -r requirements/production.txt`