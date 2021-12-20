import DBSingleton from "./db";

export async function getProvincias(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM provincias WHERE idprovincia = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        })[0];
    } else {
        const result = await instance.query("SELECT * FROM provincias");
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        });
    }
}

export async function getAgrupacionesFromProvincia(
    idProv: string,
    idAgrup?: string
) {
    const instance = await DBSingleton.instance();

    if (idAgrup) {
        const result = await instance.query(
            `
            SELECT *
            FROM (
                SELECT idprovincia, provincia, a.idagrupacion, agrupacion
                FROM (
                    SELECT ap.idprovincia, provincia, idagrupacion
                    FROM (
                        SELECT * FROM agrupacionprovincia
                        WHERE idprovincia = $1 AND idagrupacion = $2
                        ) AS AP
                    LEFT JOIN provincias p ON p.idprovincia = ap.idprovincia
                    ) AS APP
                LEFT JOIN agrupaciones a ON a.idagrupacion = APP.idagrupacion
                ) AS APPA;
            `,
            [idProv, idAgrup]
        );
        return result.rows.map((row) => {
            return { idprovincia: row[0] as string, 
                provincia: row[1] as string,
                idagrupacion: row[2] as string,
                agrupacion: row[3] as string};
        })[0];
    } else {
        const result = await instance.query(
            `
            SELECT *
            FROM (
                SELECT idprovincia, provincia, a.idagrupacion, agrupacion
                FROM (
                    SELECT ap.idprovincia, provincia, idagrupacion
                    FROM (
                        SELECT * FROM agrupacionprovincia
                        WHERE idprovincia = $1
                        ) AS AP
                    LEFT JOIN provincias p ON p.idprovincia = ap.idprovincia
                    ) AS APP
                LEFT JOIN agrupaciones a ON a.idagrupacion = APP.idagrupacion
                ) AS APPA;
            `,
            [idProv]
        );
        return result.rows.map((row) => {
            return { 
                idprovincia: row[0] as string, 
                provincia: row[1] as string,
                idagrupacion: row[2] as string,
                agrupacion: row[3] as string
            };
        });
    }
}

export async function getCargosFromProvincia(
    idProv: string,
    idCargo?: string
) {
    const instance = await DBSingleton.instance();

    if (idCargo) {
        const result = await instance.query(
            `
            SELECT DISTINCT provincia, cargo
            FROM (((
                SELECT DISTINCT idmesa, idcargo
                FROM votos
                WHERE idcargo = $2) AS v
            JOIN pscem ON pscem.idMesa = v.idMesa) AS vpscem
            JOIN cargos c ON c.idcargo = v.idcargo) AS vpscemc
            WHERE idprovincia = $1
            `,
            [idProv, idCargo]
        );
        return result.rows.map((row) => {
            return { idprovincia: row[0] as string, 
                provincia: row[1] as string,
                idCargo: row[2] as string,
                cargo: row[3] as string};
        })[0];
    } else {
        const result = await instance.query(
            `
            SELECT *
            FROM (SELECT DISTINCT idprovincia, provincia, vpscem.idcargo, cargo 
                FROM ((
                SELECT DISTINCT idmesa, idcargo
                FROM votos) AS v
            JOIN pscem ON pscem.idMesa = v.idMesa) AS vpscem
            JOIN cargos c ON c.idcargo = vpscem.idcargo) AS vpscemc
            WHERE idprovincia = $1
            `,
            [idProv]
        );
        return result.rows.map((row) => {
            return { 
                idprovincia: row[0] as string, 
                provincia: row[1] as string,
                idCargo: row[2] as string,
                cargo: row[3] as string
            };
        });
    }
}
