#!/usr/bin/env python

"""
Created on 2015-04-09T16:48:03
"""

from __future__ import division, print_function
import sys
import argparse
import sqlalchemy
from nhrc2.backend import connect_nhrc_db as conndb
from nhrc2.backend import get_neighborhoods as get_ngbrhd
from nhrc2.backend import read_issues as ri

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"


def write_to_mysql(scf_df):
    """
    PURPOSE: To take a pandas DataFrame containing all the SeeClickFix data and write it
    to a MySQL DB.
    """

    scf_df['summary'] = [el.encode('ascii', 'ignore') for el in scf_df['summary'].values]
    scf_df['description'] = [el.encode('ascii', 'ignore') for el in scf_df['description'].values]

    engine = conndb.connect_nhrc_db()

    #list datatypes:
    my_data_types = {'acknowledged_at': sqlalchemy.types.DateTime(timezone=True),
                     'address': sqlalchemy.types.Text,
                     'category': sqlalchemy.types.Text,
                     'closed_at': sqlalchemy.types.DateTime(timezone=True),
                     'created_at': sqlalchemy.types.DateTime(timezone=True),
                     'description': sqlalchemy.types.Text,
                     'id': sqlalchemy.types.INTEGER,
                     'issue_id': sqlalchemy.types.INTEGER,
                     'lat': sqlalchemy.types.FLOAT,
                     'lng': sqlalchemy.types.FLOAT,
                     'reporter_id': sqlalchemy.types.INTEGER,
                     'reporter_name': sqlalchemy.types.Text,
                     'reporter_role': sqlalchemy.types.Text,
                     'shortened_url': sqlalchemy.types.Text,
                     'status': sqlalchemy.types.Text,
                     'summary': sqlalchemy.types.Text,
                     'updated_at': sqlalchemy.types.DateTime(timezone=True),
                     'int_issue_id': sqlalchemy.types.INTEGER,
                     'neighborhood': sqlalchemy.types.Text}

    scf_df.to_sql('nhrc', engine, if_exists='replace', index=False, dtype=my_data_types)


def drive_mysql():
    """
    PURPOSE: Read the issues from the SeeClickFix API and write them to the MySQL DB
    """
    readfile = True
    writejson = False
    scf_df = ri.get_issues(readfile=readfile, writejson=writejson)

    hoods = get_ngbrhd.get_neighborhoods()

    scf_df['neighborhood'] = hoods
    write_to_mysql(scf_df)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='argparse object.')
    parser.add_argument(
        'arg1',
        help='This argument does something.')
    parser.add_argument(
        'arg2',
        help='This argument does something else. By specifying ' +
             'the "nargs=>" makes this argument not required.',
             nargs='?')
    if len(sys.argv) > 3:
        print('use the command')
        print('python filename.py tablenum columnnum')
        sys.exit(2)

    args = parser.parse_args()

    write_to_mysql(int(args.arg1), args.arg2)
