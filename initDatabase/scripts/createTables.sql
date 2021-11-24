CREATE TABLE IF NOT EXISTS votos_aux(
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


CREATE TABLE IF NOT EXISTS agrupacion(
    id INTEGER PRIMARY KEY,
    idText TEXT,
    name TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS votos(
    id SERIAL PRIMARY KEY,

    idAgrupacion INTEGER ,
    idCargo INTEGER,

    Codigo TEXT,
    Distrito TEXT,
    Establecimiento TEXT,
    Fecha TIMESTAMP,
    IdCircuito TEXT,
    IdDistrito TEXT,
    IdSeccion TEXT,
    Mesa TEXT,
    Seccion TEXT,
    electores TEXT,
    envio TEXT,
    tipoVoto TEXT,
    votos TEXT,

    FOREIGN KEY(idAgrupacion) REFERENCES agrupacion,
    FOREIGN KEY(idCargo) REFERENCES cargos
);

