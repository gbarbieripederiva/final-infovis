INSERT INTO cargos (id, name)
SELECT DISTINCT(CAST(idCargo AS INTEGER)), 
    Cargo
FROM votos_aux
WHERE idCargo != '';

INSERT INTO agrupaciones (id, idText, name)
SELECT DISTINCT(CAST(idAgrupacionInt AS INTEGER)),
    idAgrupacion,
    agrupacion
FROM votos_aux
WHERE idAgrupacionInt != '';

INSERT INTO provincias (id, name)
SELECT DISTINCT(CAST(IdDistrito AS INTEGER)),
    Distrito
FROM votos_aux
WHERE IdDistrito != '';

INSERT INTO secciones (idBD, idProvincia, name)
    SELECT DISTINCT CAST(IdSeccion AS INTEGER),
    CAST(IdDistrito AS INTEGER),
    Seccion
FROM votos_aux
WHERE IdSeccion != '';

INSERT INTO circuitos (idBD, idSeccion)
    SELECT DISTINCT IdCircuito,
    s.id
FROM votos_aux a JOIN secciones s ON CAST(a.IdSeccion AS INTEGER) = s.idBD AND CAST(a.IdDistrito AS INTEGER) = s.idProvincia
WHERE IdCircuito != '';



WITH newS AS (
    SELECT id AS idsecNoConflict,
        idBd,
        idProvincia
    FROM secciones
),
newC AS (
    SELECT id AS idcirNoConflict,
        idBd,
        idSeccion
    FROM circuitos
)
INSERT INTO establecimientos (name, idCircuito, codigo)
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
                    from votos_aux
                    group by idDistrito,
                        idSeccion,
                        idCircuito,
                        establecimiento,
                        codigo
                ) as A
                LEFT JOIN newS s ON s.idProvincia = CAST(IdDistrito AS INTEGER)
                AND s.idBD = CAST(a.idSeccion AS INTEGER)
            ) AS D
            LEFT JOIN newC c ON c.idBD = D.idCircuito AND c.idSeccion = D.idsecNoConflict
    ) as f
group BY idcirNoConflict,
    establecimiento,
    codigo) as ff;










INSERT INTO envios(id, date)
    SELECT DISTINCT CAST(envio AS INTEGER),
    fecha
FROM votos_aux
WHERE envio != '';

INSERT INTO mesas (idBd, idEstablecimiento, electores, idEnvio)
    SELECT DISTINCT mesa, 
    e.id,
    CAST(electores AS INTEGER),
    en.id
FROM establecimientos e JOIN votos_aux a ON e.name = a.establecimiento
JOIN envios en ON en.id = CAST(a.envio AS INTEGER)
WHERE mesa != '';
