INSERT INTO cargos (id, name)
SELECT DISTINCT(CAST(idCargo AS INTEGER)),
    Cargo
FROM votos_aux
WHERE idCargo != '';

INSERT INTO agrupacion (id, idText, name)
SELECT DISTINCT(CAST(idAgrupacionInt AS INTEGER)),
    idAgrupacion,
    agrupacion
FROM votos_aux
WHERE idAgrupacionInt != '';

INSERT INTO votos (
        idAgrupacion,
        idCargo,
        Codigo,
        Distrito,
        Establecimiento,
        Fecha,
        IdCircuito,
        IdDistrito,
        IdSeccion,
        Mesa,
        Seccion,
        electores,
        envio,
        tipoVoto,
        votos
    )
SELECT CAST(idAgrupacionInt AS INTEGER),
    CAST(idCargo AS INTEGER),
    Codigo,
    Distrito,
    Establecimiento,
    Fecha,
    IdCircuito,
    IdDistrito,
    IdSeccion,
    Mesa,
    Seccion,
    electores,
    envio,
    tipoVoto,
    votos
FROM votos_aux;