#!/bin/bash
if [ "$(uname)" != "Linux" ]; then
    realpath() {
        [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
    }
fi
source $(dirname $(realpath $BASH_SOURCE))/envVars
PGPASSWORD=$PGPASSWORD psql -p $DBPORT -h localhost -U $PGUSER -d $DBNAME -f $1