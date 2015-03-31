#!/usr/bin/env python

"""
PURPOSE: The routines in this file test the read_see_clickfix_api_to_csv module.

Created on 2015-03-31T18:47:31
"""

from __future__ import division, print_function
import numpy as np
from types import *
from nose.tools import raises
import pandas as pd

from nhrc2.backend import read_seeclickfix_api_to_csv as rscf

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"


def test_category_length():
    """
    Ensure there are at least 24 categories (New Haven may add more
    at a later date, hence the inequality)
    """
    cats = rscf.read_categories(readfile=True)
    assert len(cats) >= 24



def test_category_type():
    """
    Ensure that the 'type' column exists in the DataFrame
    """
    cats = rscf.read_categories(readfile=True)
    assert 'type' in cats.columns.values

#@raises(ValueError)
#def test_make_function_raise_value_error():


