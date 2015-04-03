#!/usr/bin/env python

"""
PURPOSE: The routines in this file test the get_neighborhoods module.

Created on 2015-04-02T21:24:17
"""

from __future__ import division, print_function
#import numpy as np
#from types import *
#from nose.tools import raises
#import pandas as pd

import nhrc2.backend.read_seeclickfix_api_to_csv as rscf
from nhrc2.backend import get_neighborhoods as get_ngbrhd

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"


#make sure the number of neighborhoods is equal to the number of issues.
def test_get_neighborhoods():
    """
    Ensure the number in the hood list length = the number of issues
    """
    scf_cats = rscf.read_categories(readfile=True)
    issues = rscf.read_issues(scf_cats, readfile=True)

    hoods = get_ngbrhd.get_neighborhoods()
    assert len(issues) == len(hoods)


#@raises(ValueError)
#def test_make_function_raise_value_error():


