#!/bin/bash
if [ "$(uname)" != "Linux" ]; then
    realpath() {
        [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
    }
fi
cd $(dirname $(realpath $BASH_SOURCE))
mkdir -p data
cd data
wget "https://telegramas.resultados.gob.ar/MESAS_ESCRUTADAS_Cierre.zip"
unzip MESAS_ESCRUTADAS_Cierre.zip