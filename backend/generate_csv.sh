#!/usr/bin/env bash

# added by Anaconda 2.2.0 installer
export PATH="/home/ec2-user/anaconda/bin:$PATH"

#Add my projects path to python:
export PYTHONPATH="/home/ec2-user/projects"

/home/ec2-user/projects/nhrc2/backend/read_seeclickfix_api_to_csv.py --outname /var/www/html/scf_data.csv