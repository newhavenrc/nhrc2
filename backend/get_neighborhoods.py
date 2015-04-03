#!/usr/bin/env python

"""
Created on 2015-04-02T21:43:57
"""

from __future__ import division, print_function
from collections import defaultdict
import fiona
from shapely.geometry import shape
from shapely.geometry import Point

import nhrc2
from nhrc2.backend import read_issues as ri

__author__ = "Matt Giguere (github: @mattgiguere)"
__license__ = "MIT"
__version__ = '0.0.1'
__maintainer__ = "Matt Giguere"
__email__ = "matthew.giguere@yale.edu"
__status__ = " Development NOT(Prototype or Production)"

#the project root directory:
nhrc2dir = ('/').join(nhrc2.__file__.split('/')[:-1])+'/'


def match_neighborhoods(scf_df, neighborhoods):
    hoods = []
    for idx in scf_df.index:
        grid_point = Point(scf_df.loc[idx, 'lng'], scf_df.loc[idx, 'lat'])
        for hoodnum, hood in enumerate(neighborhoods):
            if grid_point.within(neighborhoods[hood]):
                hoods.append(hood)
                break
            if hoodnum == 19:
                #There are 20 neighborhoods. If you are the 20th (element 19 in
                #zero-based indexing) and have not continued out of the iteration
                #set the neighborhood name to "Other":
                hoods.append('Other')
    return hoods


def get_neighborhoods():
    """
    PURPOSE: To take in a pandas DataFrame of issues and a dictionary with the
    shapes and names of the New Haven neighborhoods and output a list
    containing the neighborhood for each issue.
    """

    scf_df = ri.get_issues(readfile=True)

    #now get the GIS data for the neighborhoods:
    rgns = fiona.open(nhrc2dir+'data/nh_neighborhoods/nh_neighborhoods.shp')

    nhv_geom = defaultdict()

    for rec in rgns:
        #print(rec['geometry']['type'])
        hood = rec['properties']['name']
        nhv_geom[hood] = shape(rec['geometry'])

    hoods = match_neighborhoods(scf_df, nhv_geom)

    return hoods
