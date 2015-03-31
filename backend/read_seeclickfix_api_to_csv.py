#!/usr/bin/env python

"""
Created on 2015-03-31T18:37:11
"""

from __future__ import division, print_function
import sys
import argparse
import json
import urllib2
import pandas as pd
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

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"


def read_categories(readfile=False):
    """
    PURPOSE: The subroutine to read in the category data.

    :param readfile: [optional]
        Read the category data from file for test purposes.
    """
    if readfile:
        json_cats = json.load(open('/Users/matt/projects/nhrc2/data/scf_cats.json', 'r'))
    else:
        json_cats = json.load(urllib2.urlopen('https://seeclickfix.com/api/v2/issues/new?address=New+Haven,+CT'))



def read_seeclickfix_api_to_csv(arg1, arg2):
    """PURPOSE: To """

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

    read_seeclickfix_api_to_csv(int(args.arg1), args.arg2)