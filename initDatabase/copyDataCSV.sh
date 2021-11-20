#!/bin/bash
# PGPASSWORD=contraseña psql -h localhost -U usuario -c "show datestyle;"
# PGPASSWORD=contraseña psql -h localhost -U usuario -c "SET datestyle = 'ISO,DMY';"
# PGPASSWORD=contraseña psql -h localhost -U usuario -c "show datestyle;"
PGPASSWORD=contraseña psql -h localhost -U usuario -c "SET datestyle = 'ISO,DMY';" -c "\\copy votos(Agrupacion,Cargo,Codigo,Distrito,Establecimiento,Fecha,IdCargo,IdCircuito,IdDistrito,IdSeccion,Mesa,Seccion,electores,envio,idAgrupacion,idAgrupacionInt,tipoVoto,votos)
FROM '$(dirname $(realpath $BASH_SOURCE))/data/MESAS_ESCRUTADAS_Cierre.csv'
DELIMITER ','
NULL ''
CSV HEADER;"