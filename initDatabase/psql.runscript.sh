#!/bin/bash
source $(dirname $(realpath $BASH_SOURCE))/envVars
PGPASSWORD=$PGPASSWORD psql -h localhost -U $PGUSER -d $DBNAME -f $1