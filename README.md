# VTU

Web app for Vancouver landlord data (current address: http://www.vanlandlord.ga)

Stack:
* Frontend: React.js (Maps with leaflet)
* Backend: Django Rest API
* Database: Postgis (AWS RDS)

### TODO:
* Add check when signup to see if username/email is available (convert login page to yup/formik as well)
* When user clicks on marker, change to props tab of sidebar
* Make profile page interactive (user can change email, etc.)
* Bring in landlord data markers
* Add ability for users to comment on marker/locations
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