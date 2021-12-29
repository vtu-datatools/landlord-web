import datetime
import logging
import itertools
import os
import subprocess
from tqdm import tqdm

from . import sql
from .database import Database
from .file import File
from .utility import list_wrap, merge
from .datasets import datasets

BATCH_SIZE = 1000


class Dataset:
    """
    Most CLI actions correspond to a method in this class.
    It is initialized with the name of a dataset:
        current_issues = Dataset('current_issues')
    To download the files:
        current_issues.download_files()
    To load the files into postgres:
        current_issues.db_import()
    """

    def __init__(self, dataset_name, root_dir= './data'):
        self.name = dataset_name
        self.root_dir = root_dir
        self.db = None
        
        self.dataset = datasets()[dataset_name]
        self.files = self._files()
        self.schemas = list_wrap(self.dataset['schema'])

    def __str__(self):
        return "Dataset Name: {}. Files: {}".format(self.name, self.files)

    def _files(self):
        return [File(file_dict, folder=self.name, root_dir=self.root_dir) for file_dict in self.dataset['files']]


    def download_files(self):
        """
        Downloads all files for the dataset.
        See ./file.py for more details.
        """
        for f in self.files:
            f.download()


    def db_import(self):
        """
        Inserts the dataset in the postgres.
        Output:  True | Throws
        """
        self.setup_db()
        self.create_schema()

        for schema in self.schemas:
            self.import_schema(schema)

        self.sql_files()

    def index(self):
        """
        Some datasets contains additional indices (notably, full-text-search indices)
        that are not automatically created.
        This method creates those indices.
        It does nothing if the dataset has no additional indexes
        """
        if 'index' in self.dataset:
            for sql_file in self.dataset['index']:
                self.db.execute_sql_file(sql_file)
        else:
            logging.debug('no index files exist for this dataset')


    def import_schema(self, schema):
        """
        Imports the schema (table) into postgres in batches.
        """
        rows = self.transform(schema)

        pbar = tqdm(unit='rows', disable=self.args.hide_progress)
        while True:
            batch = list(itertools.islice(rows, 0, BATCH_SIZE))
            if len(batch) == 0:
                break
            else:
                pbar.update(len(batch))
                self.db.insert_rows(batch, table_name=schema['table_name'])
        pbar.close()

    def create_schema(self):
        """
        Issues CREATE TABLE statements for all tables in the dataset.
        """
        create_table = lambda name, fields: self.db.sql(sql.create_table(name, fields))

        for s in self.schemas:
            create_table(s['table_name'], s['fields'])

    def sql_files(self):
        """
        Executes all sql files for the dataset.
        """
        if 'sql' in self.dataset:
            for f in self.dataset['sql']:
                self.db.execute_sql_file(f)

    def setup_db(self):
        """
        Establishes the Database object. Used to lazy-load self.db.
        """
        if self.db is None:
            self.db = Database(self.args, table_name=self.name)


    def dump(self):
        """
        Creates .sql dump file of the datasets.
        Saves the file with the format [DATASET_NAME]-DATE.sql
        """
        tables = ['--table={}'.format(s['table_name']) for s in self.schemas]
        file_arg = '--file=./{}-{}.sql'.format(self.name, datetime.date.today().isoformat())
        cmd = ["pg_dump", "--no-owner", "--clean", "--if-exists", "-w"] + tables + [file_arg]
        subprocess.run(cmd, env=self.pg_env(), check=True)

    def pg_env(self):
        """
        Returns a copy of the environment with postgres environment variables set
        to be the same as the values provided by the args, which are typically given
        on the command line.
        """
        return merge(
            os.environ.copy(),
            {
                'POSTGRES_HOST': self.args.host,
                'POSTGRES_PORT': self.args.port,
                'POSTGRES_USER': self.args.user,
                'POSTGRES_DB': self.args.database,
                'POSTGRES_PASSWORD': self.args.password
            })
