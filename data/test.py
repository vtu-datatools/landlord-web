import os

from scraper.dataset import Dataset


POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=vtudata
POSTGRES_USER=postgres
POSTGRES_PASSWORD=fake_pass
os.environ['POSTGRES_HOST']

current_issues = Dataset('current_issues')
print(current_issues)
print(current_issues.files)
current_issues.download_files()