#!/bin/bash
cd $BASH_SOURCE
mkdir -p data
cd data
wget "https://telegramas.resultados.gob.ar/MESAS_ESCRUTADAS_Cierre.zip"
unzip MESAS_ESCRUTADAS_Cierre.zip