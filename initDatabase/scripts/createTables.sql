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
    idCargo INTEGER PRIMARY KEY,
    cargo TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS agrupaciones(
    idAgrupacion INTEGER PRIMARY KEY,
    idText TEXT, --No tiene utilidad?
    agrupacion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS provincias(
    idProvincia INTEGER PRIMARY KEY,
    provincia TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS secciones(
    idSeccion SERIAL PRIMARY KEY,
    idBd INTEGER, --No tiene utilidad?
    idProvincia INTEGER, 
    seccion TEXT NOT NULL,

    FOREIGN KEY(idProvincia) REFERENCES provincias

);

CREATE TABLE IF NOT EXISTS circuitos(
    idCircuito SERIAL PRIMARY KEY,
    idBd TEXT,
    idSeccion INTEGER,
    
    FOREIGN KEY(idSeccion) REFERENCES secciones

);

CREATE TABLE IF NOT EXISTS establecimientos(
    idEstablecimiento SERIAL PRIMARY KEY,
    establecimiento TEXT NOT NULL,
    idCircuito INTEGER,
    codigo INTEGER, 
    
    FOREIGN KEY(idCircuito) REFERENCES circuitos

    
);

CREATE TABLE IF NOT EXISTS envios(
    idEnvio INTEGER PRIMARY KEY,
    date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mesas(
    idMesa SERIAL PRIMARY KEY,
    idBd TEXT,
    idEstablecimiento INTEGER,
    electores INTEGER,
    idEnvio INTEGER,
    
    FOREIGN KEY(idEstablecimiento) REFERENCES establecimientos,
    FOREIGN KEY(idEnvio) REFERENCES envios
);




CREATE TABLE IF NOT EXISTS tiposvotos(
    idTipoVoto SERIAL PRIMARY KEY,
    tipoVoto TEXT
);

CREATE TABLE IF NOT EXISTS votos(
    idVoto SERIAL PRIMARY KEY,

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

CREATE TABLE IF NOT EXISTS agrupacionProvincia(
    idAgrupacion INTEGER NOT NULL,
    idProvincia INTEGER NOT NULL,

    FOREIGN KEY(idAgrupacion) REFERENCES agrupaciones,
    FOREIGN KEY(idProvincia) REFERENCES provincias,
    PRIMARY KEY(idAgrupacion, idProvincia)
);