#Description of MySQL Database

The neighborhood and SeeClickFix API data were written to a MySQL database. Querying the mysql database and processing only the data of interest instead of processing the entire data set in csv format significantly reduces the time between clicks.

This document describes the MySQL Database used for the New Haven Report Card.

###Parameters
- id
- status
- summary
- description
- address
- lat
- lng
- closed_at
- acknowledged_at
- created_ad
- updated_at
- shortened_url
- reporter_id
- reporter_name
- reporter_role
- neighborhood



###Tables
location

reporter