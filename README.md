# Final de Visualizacion de la Informacion

## Inicializar la base de datos
Para inicializar la base de datos con nuestros scripts ingresar a la carpeta `initDatabase` y hacer una copia del archivo `envVars.example` y renombrarlo a `envVars`. El mismo contendra las siguientes opciones que se pueden editar:
```bash
export PGUSER=username
export PGPASSWORD=password
export DBNAME=postgres
export DBPORT=5432
```
Luego correr los siguientes comandos uno a uno:
```bash
getData.sh
createDockerPostgres.sh
psql.runscript.sh ./scripts/createTables.sql
copyDataCSV.sh
psql.runscript.sh ./scripts/posInsertProcess.sql
```

Por ultimo cuando se desee apagar la base de datos se debe correr:
```bash
stopDockerPostgres.sh
```

## Antes de correr
Antes de correr la aplicacion es importante correr (dentro de la carpeta raiz del proyecto)
```
npm install
```
Para instalar las dependencias necesarias

## Configuracion
Para configurar la aplicacion se puede usar cualquiera de las siguientes opciones, las cuales deben agregarse en el archivo `config.env` en el directorio raiz de la aplicacion
```
PORT=8080
DB_HOST=localhost
DB_DATABASE=infovis
DB_USER=postgres
DB_PASSWORD=contraseña
DB_PORT=5432
```
- PORT : configura el puerto donde arranca la aplicacion
- DB_HOST : configura el host donde corre postgres
- DB_DATABASE : configura el nombre de la base de datos dentro de postgres
- DB_USER : configura el usuario de postgres
- DB_PASSWORD : configura la contraseña de postgres
- DB_PORT : configura el puerto de postgres

## Como correrlo

#### Development
```
npm run dev
```
#### Produccion
```
npm start
```