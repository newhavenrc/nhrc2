#!/usr/bin/env python

"""
Created on 2015-04-02T22:23:27
"""

from __future__ import division, print_function
import sys

try:
    import numpy as np
except ImportError:
    print('You need numpy installed')
    sys.exit(1)

import pandas as pd
import json
import urllib2
from jq import jq
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


def read_issues(scf_cat_df, readfile=False, writejson=False):
    """
    PURPOSE: To read in all the category data from the API and return
        a pandas DataFrame

    :param scf_cat_df:
        The category DataFrame

    :param readfile: [optional]
        If set to True, the issues JSON object will be read from file instead of
        from the SeeClickFix API. The default is False

    :param writejson: [optional]
        If set to True, the JSON read from the SeeClickFix API will be written
        to file. The default is False.

    """

    #the jq rule that will be used to flatten the JSON object return from the
    #SCF API into something pandas can understand:
    record_rule = ("[.issues | .[] | {"
                   "id: .id, "
                   "status: .status,"
                   "summary: .summary,"
                   "description: .description,"
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

    scf_df = pd.DataFrame(columns=['id', 'status', 'summary', 'description',
                                   'address', 'lat', 'lng', 'closed_at',
                                   'acknowledged_at', 'created_at',
                                   'updated_at', 'shortened_url',
                                   'reporter_id', 'reporter_name',
                                   'reporter_role',
                                   'issue_id', 'category'])

    for i in scf_cat_df.index:
        print(scf_cat_df.loc[i, 'title'], scf_cat_df.loc[i, 'type'])
        issurl = 'https://seeclickfix.com/api/v2/issues?request_types='+scf_cat_df.loc[i, 'type']+'&per_page=10000'

        if readfile:
            json_data = json.load(open(nhrc2dir+'data/scf_data_iss'+scf_cat_df.loc[i, 'type']+'.json', 'r'))
        else:
            json_data = json.load(urllib2.urlopen(issurl))

        if writejson:
            json.dump(json_data, open(nhrc2dir+'data/scf_data_iss'+scf_cat_df.loc[i, 'type']+'.json', 'w'))

        scf_iss_df = pd.DataFrame(jq(record_rule).transform(json_data))
        scf_iss_df['issue_id'] = scf_cat_df.loc[i, 'type']
        scf_iss_df['category'] = scf_cat_df.loc[i, 'title']
        scf_df = scf_df.append(scf_iss_df, ignore_index=True)

    issue_ints = scf_df['issue_id'].values
    issue_ints[np.where(issue_ints == 'other')[0]] = -1
    new_ints = [int(i) for i in issue_ints]
    scf_df['int_issue_id'] = new_ints

    #get rid of issues that do not have coordinates within New Haven:
    scf_df = scf_df[((scf_df['lat'] < 41.36) & (scf_df['lat'] > 41.24) & (scf_df['lng'] >= -73.00) & (scf_df['lng'] <= -72.86))]

    return scf_df


def get_issues(readfile=False, writejson=False):
    #first read in the category information:
    scf_cat_df = read_categories(readfile=readfile)

    scf_df = read_issues(scf_cat_df, readfile=readfile, writejson=writejson)
    return scf_df

