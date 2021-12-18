#!/bin/bash
if [ "$(uname)" != "Linux" ]; then
    realpath() {
        [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
    }
fi
source $(dirname $(realpath $BASH_SOURCE))/envVars

SCRIPT_FOLDER=$(dirname $(realpath $BASH_SOURCE))
if [[ -d "$SCRIPT_FOLDER/data" ]] ; then
    ADD_DATA_FOLDER="-v $SCRIPT_FOLDER/data:/mnt/data"
fi

DB_DATA_FOLDER=$SCRIPT_FOLDER/dbdata
mkdir -p $DB_DATA_FOLDER
docker run 	--rm --name infovis_postgres -p $DBPORT:5432 \
		-v $DB_DATA_FOLDER:/var/lib/postgresql/data \
        $ADD_DATA_FOLDER \
 		-e POSTGRES_PASSWORD=$PGPASSWORD -e POSTGRES_USER=$PGUSER \
		-d postgres