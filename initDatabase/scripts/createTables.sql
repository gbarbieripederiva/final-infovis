CREATE TABLE IF NOT EXISTS votos_aux(
    id SERIAL PRIMARY KEY,
    Agrupacion TEXT,
    Cargo TEXT,
    Codigo TEXT,
    Distrito TEXT,
    Establecimiento TEXT,
    Fecha TIMESTAMP,
    IdCargo TEXT,
    IdCircuito TEXT,
    IdDistrito TEXT,
    IdSeccion TEXT,
    Mesa TEXT,
    Seccion TEXT,
    electores TEXT,
    envio TEXT,
    idAgrupacion TEXT,
    idAgrupacionInt TEXT,
    tipoVoto TEXT,
    votos TEXT
);



CREATE TABLE IF NOT EXISTS cargos(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS agrupaciones(
    id INTEGER PRIMARY KEY,
    idText TEXT, --No tiene utilidad?
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS provincias(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS secciones(
    id SERIAL PRIMARY KEY,
    idBd INTEGER, --No tiene utilidad?
    idProvincia INTEGER, 
    name TEXT NOT NULL,

    FOREIGN KEY(idProvincia) REFERENCES provincias

);

CREATE TABLE IF NOT EXISTS circuitos(
    id SERIAL PRIMARY KEY,
    idBd TEXT,
    idSeccion INTEGER,
    
    FOREIGN KEY(idSeccion) REFERENCES secciones

);

CREATE TABLE IF NOT EXISTS establecimientos(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    idCircuito INTEGER,
    codigo INTEGER, 
    
    FOREIGN KEY(idCircuito) REFERENCES circuitos

    
);

CREATE TABLE IF NOT EXISTS envios(
    id INTEGER PRIMARY KEY,
    date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mesas(
    id SERIAL PRIMARY KEY,
    idBd TEXT,
    idEstablecimiento INTEGER,
    electores INTEGER,
    idEnvio INTEGER,
    
    FOREIGN KEY(idEstablecimiento) REFERENCES establecimientos,
    FOREIGN KEY(idEnvio) REFERENCES envios
);




CREATE TABLE IF NOT EXISTS tiposvotos(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS votos(
    id SERIAL PRIMARY KEY,

    idAgrupacion INTEGER ,
    idCargo INTEGER,
    idMesa INTEGER,
    idTipoVoto INTEGER,
    
    votes INTEGER,

    FOREIGN KEY(idAgrupacion) REFERENCES agrupaciones,
    FOREIGN KEY(idMesa) REFERENCES mesas,
    FOREIGN KEY(idCargo) REFERENCES cargos,
    FOREIGN KEY(idTipoVoto) REFERENCES tiposvotos
);