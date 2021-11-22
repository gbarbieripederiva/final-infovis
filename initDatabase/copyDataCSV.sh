#!/bin/bash
source $(dirname $(realpath $BASH_SOURCE))/envVars

PGPASSWORD=$PGPASSWORD psql -h localhost -U $PGUSER -d $DBNAME -c "SET datestyle = 'ISO,DMY';" -c "\\copy votos(Agrupacion,Cargo,Codigo,Distrito,Establecimiento,Fecha,IdCargo,IdCircuito,IdDistrito,IdSeccion,Mesa,Seccion,electores,envio,idAgrupacion,idAgrupacionInt,tipoVoto,votos)
FROM '$(dirname $(realpath $BASH_SOURCE))/data/MESAS_ESCRUTADAS_Cierre.csv'
DELIMITER ','
NULL ''
CSV HEADER;"