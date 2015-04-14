#!/usr/bin/env python

"""
Created on 2015-03-31T18:37:11
"""

from __future__ import division, print_function
import argparse

import nhrc2
from nhrc2.backend import get_neighborhoods as get_ngbrhd
from nhrc2.backend import read_issues as ri
from nhrc2.backend import write_to_mysql
import pandas as pd

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"

#get the root directory for the package. This will allow for the
#code to be run from any directory on any machine:
nhrc2dir = '/'.join(str(nhrc2.__file__).split('/')[:-1])+'/'


def write_to_csv(scf_df, outname):
    """PURPOSE:
        To write the contents to CSV
    """
    if outname != '':
        outname = outname
    else:
        outname = nhrc2dir+'data/scf_data_full.csv'

    scf_df.to_csv(outname, sep=',', encoding='utf-8')


def read_seeclickfix_api_to_csv(readfile=False, writejson=False,
                                donotwrite=False, outname=''):
    """PURPOSE:
        To read in all the New Haven data from the see click fix API
        for New Haven and write it to CSV. The data will be visualized
        with CartoDB, which cannot take SQL input.
    """

    scf_df = ri.get_issues(readfile=readfile, writejson=writejson)

    hoods = get_ngbrhd.get_neighborhoods(readfile=readfile, scf_df=scf_df)

    print('len of hoods: {}'.format(len(hoods)))
    print('len of scf_df: {}'.format(len(scf_df)))

    scf_df['neighborhood'] = hoods
    scf_df['time_to_ack'] = (pd.to_datetime(scf_df['acknowledged_at']) -
                             pd.to_datetime(scf_df['created_at'])) / pd.Timedelta('1d')

    scf_df['time_to_cmp'] = (pd.to_datetime(scf_df['closed_at']) -
                             pd.to_datetime(scf_df['created_at'])) / pd.Timedelta('1d')

    if not donotwrite:
        write_to_csv(scf_df, outname)
        write_to_mysql.write_to_mysql(scf_df)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='argparse object.')
    parser.add_argument(
        '--readfile',
        help='This routine is intended to read in the data straight from' +
             'the seeclickfix api. If you want to test it by reading in ' +
             'data from file, set --readfile.', action="store_true")
    parser.add_argument(
        '--writejson',
        help='This routine is intended to read in the data straight from' +
             'the seeclickfix api. If you want to create test data by ' +
             'writing the JSON issue data to file, set --write.',
             action="store_true")
    parser.add_argument(
        '--donotwrite',
        help='This routine is intended to write the data read in from SCF' +
             'to a CSV. If you want to test it by reading in ' +
             'data but NOT writing to CSV, set --donotwrite.', action="store_true")
    parser.add_argument(
        '--outname',
        help='Set this if you want to specify the output filename. ',
             type=str)

    args = parser.parse_args()

    if args.readfile:
        readfile = True
    else:
        readfile = False

    if args.writejson:
        writejson = True
    else:
        writejson = False

    if args.donotwrite:
        donotwrite = True
    else:
        donotwrite = False

    if args.outname:
        outname = args.outname
    else:
        outname = ''

    read_seeclickfix_api_to_csv(readfile=readfile, donotwrite=donotwrite,
                                outname=outname, writejson=writejson)
