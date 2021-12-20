INSERT INTO cargos (idCargo, cargo)
SELECT DISTINCT(CAST(idCargo AS INTEGER)), 
    Cargo
FROM votos_aux
WHERE idCargo != '';

INSERT INTO agrupaciones (idAgrupacion, idText, agrupacion)
SELECT DISTINCT(CAST(idAgrupacionInt AS INTEGER)),
    idAgrupacion,
    agrupacion
FROM votos_aux
WHERE idAgrupacionInt != '';

INSERT INTO provincias (idProvincia, provincia)
SELECT DISTINCT(CAST(IdDistrito AS INTEGER)),
    Distrito
FROM votos_aux
WHERE IdDistrito != '';

INSERT INTO secciones (idBD, idProvincia, seccion)
    SELECT DISTINCT CAST(IdSeccion AS INTEGER),
    CAST(IdDistrito AS INTEGER),
    Seccion
FROM votos_aux
WHERE IdSeccion != '';

INSERT INTO circuitos (idBD, idSeccion)
    SELECT DISTINCT IdCircuito,
    s.idSeccion
FROM (select * from votos_aux ) as a JOIN secciones s ON CAST(a.IdSeccion AS INTEGER) = s.idBD AND CAST(a.IdDistrito AS INTEGER) = s.idProvincia
WHERE IdCircuito != '';

WITH newS AS (
    SELECT idSeccion AS idsecNoConflict,
        idBd,
        idProvincia
    FROM secciones
),
newC AS (
    SELECT idCircuito AS idcirNoConflict,
        idBd,
        idSeccion
    FROM circuitos
)
INSERT INTO establecimientos (establecimiento, idCircuito, codigo)
select 
    establecimiento,
idcirNoConflict,
    CAST(Codigo AS INTEGER)
from (select idcirNoConflict, establecimiento, codigo
from (
        SELECT *
        FROM (
                (
                    select idDistrito,
                        idSeccion,
                        idCircuito,
                        establecimiento,
                        codigo
                    FROM votos_aux
                    group by idDistrito,
                        idSeccion,
                        idCircuito,
                        establecimiento,
                        codigo
                    
                ) as A
                LEFT JOIN newS s ON s.idProvincia = CAST(IdDistrito AS INTEGER)
                AND s.idBD = CAST(a.idSeccion AS INTEGER)
            ) AS aas
            LEFT JOIN newC c ON c.idBD = aas.idCircuito AND c.idSeccion = aas.idsecNoConflict
    ) as aasc
group BY idcirNoConflict,
    establecimiento,
    codigo) as aasc2;

INSERT INTO envios(idEnvio, date)
    SELECT DISTINCT CAST(envio AS INTEGER),
    fecha
FROM votos_aux
WHERE envio != '';

INSERT INTO mesas (idBd, idEstablecimiento, electores, idEnvio)
    SELECT DISTINCT mesa, 
    e.idEstablecimiento,
    CAST(electores AS INTEGER),
    en.idEnvio
FROM establecimientos e JOIN (select * from votos_aux ) as a ON e.establecimiento = a.establecimiento and e.codigo = CAST(a.codigo AS INTEGER)
JOIN envios en ON en.idEnvio = CAST(a.envio AS INTEGER)
WHERE mesa != '';

INSERT INTO tiposvotos(tipoVoto)
    SELECT DISTINCT tipoVoto
    FROM votos_aux
    WHERE tipoVoto != '';


    
INSERT INTO agrupacionProvincia(idAgrupacion, idProvincia)
    SELECT DISTINCT CAST(idAgrupacionInt AS INTEGER), 
                    CAST(idDistrito AS INTEGER)
    FROM votos_aux
    WHERE idAgrupacionInt != '';


-- This is needed to optimize insertion
CREATE MATERIALIZED VIEW pscem AS
SELECT idProvincia, provincia, idSeccion, idSeccionBD, idCircuito, idCircuitoBD, psce.idEstablecimiento, establecimiento, codigo, idMesa, m.idBD AS idMesaBD
FROM (
    SELECT idProvincia, provincia, idSeccion, idSeccionBD, idCircuito, idCircuitoBD, e.idEstablecimiento, establecimiento, codigo
    FROM (
        SELECT idProvincia, provincia, ps.idSeccion, idSeccionBD, idCircuito, c.idBD as IdCircuitoBD
        FROM (
            SELECT idProvincia, provincia, idSeccion, s.idBD as idSeccionBD
            FROM provincias AS p
            NATURAL JOIN secciones s) AS ps
        JOIN circuitos c ON c.idSeccion = ps.idSeccion) AS psc
    NATURAL JOIN establecimientos e) AS psce
JOIN mesas m ON m.idEstablecimiento = psce.idEstablecimiento;

CREATE MATERIALIZED VIEW votos_casted AS
SELECT CAST(idAgrupacionInt AS INTEGER), CAST(idCargo AS INTEGER), mesa, tipoVoto, CAST(votos AS INTEGER), establecimiento, CAST(codigo AS INTEGER), idCircuito, CAST(idSeccion AS INTEGER), CAST(idDistrito AS INTEGER)
        FROM votos_aux;

INSERT INTO votos(idAgrupacion, idCargo, idMesa, idTipoVoto, votes)
SELECT idAgrupacionInt, idCargo, ATVPSCEM.idMesa, idtipovoto, votos
FROM 
((votos_casted A JOIN tiposvotos tv ON tv.tipoVoto = A.tipoVoto) AS ATV
JOIN pscem ON 
            ATV.mesa = pscem.idMesaBD 
            AND ATV.establecimiento = pscem.establecimiento 
            AND ATV.codigo = pscem.codigo 
            AND ATV.idCircuito = pscem.idCircuitoBD 
            AND ATV.idSeccion = pscem.idSeccionBD
            AND ATV.idDistrito = pscem.idProvincia) AS ATVPSCEM;