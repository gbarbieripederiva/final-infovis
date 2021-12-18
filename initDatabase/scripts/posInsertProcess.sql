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


WITH newM AS (
    SELECT idMesa AS idmesaNoConflict,
        idBd,
        idEstablecimiento,
        electores,
        idEnvio
    FROM mesas
),
newTV AS (
    SELECT idTipoVoto AS idtipovotoNoConflict,
        tipoVoto
    FROM tiposvotos
),
newE AS (
    SELECT idEstablecimiento AS idestablecimientoNoConflict,
        establecimiento, 
        idCircuito as idcirinest, 
        codigo
    FROM establecimientos
),
newC AS (
    SELECT idCircuito AS idcirNoConflict,
        idbd,
        idSeccion AS idsecincirNoConflict
    FROM circuitos
),
newS AS (
    SELECT idSeccion AS idsecNoConflict,
        idbd,
        idProvincia,
        seccion
    FROM secciones
)
INSERT INTO votos(idAgrupacion, idCargo, idMesa, idTipoVoto, votes)
    SELECT CAST(idAgrupacionInt AS INTEGER), CAST(idCargo AS INTEGER), idmesaNoConflict, idtipovotoNoConflict, CAST(votos AS INTEGER)
    FROM 
        ((((((SELECT idAgrupacionInt, idCargo, mesa, tipoVoto, votos, establecimiento, codigo, idCircuito, idSeccion, idDistrito
        FROM votos_aux) AS A
        LEFT JOIN newTV tv ON tv.tipoVoto = A.tipoVoto) AS ATV
        LEFT JOIN newC c ON c.idbd = ATV.idCircuito and c.idsecincirNoConflict = CAST(ATV.idSeccion AS INTEGER)) AS ATVC
        LEFT JOIN newS s ON s.idbd = ATVC.idsecincirNoConflict and s.idProvincia = CAST(ATVC.idDistrito AS INTEGER)) AS ATVCS
        LEFT JOIN newE e ON e.establecimiento = ATVCS.establecimiento and e.codigo = CAST(ATVCS.codigo AS INTEGER) and e.idcirinest = ATVCS.idcirNoConflict) AS ATVCSE
        LEFT JOIN newM m ON m.idBD = ATVCSE.mesa AND ATVCSE.idestablecimientoNoConflict = m.idEstablecimiento) AS ATVCSEM;
    
INSERT INTO agrupacionProvincia(idAgrupacion, idProvincia)
    SELECT DISTINCT CAST(idAgrupacionInt AS INTEGER), 
                    CAST(idDistrito AS INTEGER)
    FROM votos_aux
    WHERE idAgrupacionInt != '';