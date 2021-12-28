import csv
import requests

CSV_URL = 'https://opendata.vancouver.ca/explore/dataset/rental-standards-current-issues/download/?format=csv'


with requests.Session() as s:
    download = s.get(CSV_URL)
    decoded_content = download.content.decode('utf-8')

    cr = csv.reader(decoded_content.splitlines(), delimiter=';')
    my_list = list(cr)
    print(len(my_list))
    # for row in my_list[:10]:
    #     print(row)
