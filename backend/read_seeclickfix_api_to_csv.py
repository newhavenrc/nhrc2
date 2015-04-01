#!/usr/bin/env python

"""
Created on 2015-03-31T18:37:11
"""

from __future__ import division, print_function
import sys
import argparse
import json
import urllib2
from jq import jq

try:
    import numpy as np
except ImportError:
    print('You need numpy installed')
    sys.exit(1)

try:
    import matplotlib.pyplot as plt
except ImportError:
    print('You need to install matplotlib')

import pandas as pd
import nhrc2

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"


#get the root directory for the package. This will allow for the
#code to be run from any directory on any machine:
nhrc2dir = '/'.join(str(nhrc2.__file__).split('/')[:-1])+'/'


def read_categories(readfile=False):
    """
    PURPOSE: The subroutine to read in the category data.

    :param readfile: [optional]
        Read the category data from file for test purposes.
    """
    if readfile:
        json_cats = json.load(open(nhrc2dir+'data/scf_cats.json', 'r'))
    else:
        json_cats = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues/new?address=New+Haven,+CT'))

    scf_cat_rule = '[.[] | .[] | {title: .title, url: .url, organization: .organization}]'

    scf_cat_df = pd.DataFrame(jq(scf_cat_rule).transform(json_cats))
    scf_cat_df['type'] = [urlstr.split('/')[-1] for urlstr in scf_cat_df['url']]

    return scf_cat_df


def read_issues(scf_cat_df, readfile=False):
    """
    PURPOSE: To read in all the category data from the API and return
        a pandas DataFrame

    :param scf_cat_df:
        The category DataFrame

    """

    #the jq rule that will be used to flatten the JSON object return from the
    #SCF API into something pandas can understand:
    record_rule = ("[.issues | .[] | {"
                   "id: .id, "
                   "status: .status,"
                   "summary: .summary,"
                   "address: .address,"
                   "lat: .lat,"
                   "lng: .lng,"
                   "closed_at: .closed_at,"
                   "acknowledged_at: .acknowledged_at,"
                   "created_at: .created_at,"
                   "updated_at: .updated_at,"
                   "shortened_url: .shortened_url,"
                   "reporter_id: .reporter.id,"
                   "reporter_name: .reporter.name,"
                   "reporter_role: .reporter.role,"
                   "}]")

    scf_df = pd.DataFrame(columns=['id', 'status', 'summary', 'address', 'lat', 'lng', 'closed_at', 'acknowledged_at',
                                   'created_at', 'updated_at', 'shortened_url',
                                   'reporter_id', 'reporter_name', 'reporter_role',
                                   'issue_id', 'category'])

    for i in scf_cat_df.index:
        print(scf_cat_df.loc[i, 'title'], scf_cat_df.loc[i, 'type'])
        issurl = 'https://seeclickfix.com/api/v2/issues?request_types='+scf_cat_df.loc[i, 'type']+'&per_page=10000'
        json_data = json.load(urllib2.urlopen(issurl))
        scf_iss_df = pd.DataFrame(jq(record_rule).transform(json_data))
        scf_iss_df['issue_id'] = scf_cat_df.loc[i, 'type']
        scf_iss_df['category'] = scf_cat_df.loc[i, 'title']
        scf_df = scf_df.append(scf_iss_df, ignore_index=True)

    issue_ints = scf_df['issue_id'].values
    issue_ints[np.where(issue_ints == 'other')[0]] = -1
    new_ints = [int(i) for i in issue_ints]
    scf_df['int_issue_id'] = new_ints

    return scf_df


def write_to_csv(scf_df):
    """PURPOSE:
        To write the contents to CSV
    """
    scf_df.to_csv(nhrc2dir+'data/scf_data_full.csv', sep=',', encoding='utf-8')


def read_seeclickfix_api_to_csv(readfile=False, donotwrite=False):
    """PURPOSE:
        To read in all the New Haven data from the see click fix API
        for New Haven and write it to CSV. The data will be visualized
        with CartoDB, which cannot take SQL input.
    """

    #first read in the category information:
    scf_cat_df = read_categories(readfile=True)

    scf_df = read_issues(scf_cat_df, readfile=readfile)

    if not donotwrite:
        write_to_csv(scf_df)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='argparse object.')
    parser.add_argument(
        '--readfile',
        help='This routine is intended to read in the data straight from' +
             'the seeclickfix api. If you want to test it by reading in ' +
             'data from file, set --readfile.', action="store_true")
    parser.add_argument(
        '--donotwrite',
        help='This routine is intended to write the data read in from SCF' +
             'to a CSV. If you want to test it by reading in ' +
             'data but NOT writing to CSV, set --donotwrite.', action="store_true")

    args = parser.parse_args()

    if args.readfile:
        readfile = True
    else:
        readfile = False

    if args.donotwrite:
        donotwrite = False
    else:
        donotwrite = True

    read_seeclickfix_api_to_csv(readfile=readfile, donotwrite=donotwrite)
