# Final de Visualizacion de la Informacion

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