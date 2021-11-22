#!/bin/bash
source $(dirname $(realpath $BASH_SOURCE))/envVars

DB_DATA_FOLDER=$(dirname $(realpath $BASH_SOURCE))/dbdata
mkdir -p $DB_DATA_FOLDER
docker run 	--rm --name infovis_postgres -p 5432:5432 \
		-v $DB_DATA_FOLDER:/var/lib/postgresql/data \
 		-e POSTGRES_PASSWORD=$PGPASSWORD -e POSTGRES_USER=$PGUSER \
		-d postgres