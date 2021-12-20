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
            return {
                idprovincia: row[0] as string,
                provincia: row[1] as string,
                idagrupacion: row[2] as string,
                agrupacion: row[3] as string,
            };
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
                agrupacion: row[3] as string,
            };
        });
    }
}

export async function getCargosFromProvincia(idProv: string, idCargo?: string) {
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
            return {
                idprovincia: row[0] as string,
                provincia: row[1] as string,
                idCargo: row[2] as string,
                cargo: row[3] as string,
            };
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
                cargo: row[3] as string,
            };
        });
    }
}

export async function getTiposDeVotosCountByProvincia(idtipovoto?: string) {
    const instance = await DBSingleton.instance();

    if (idtipovoto) {
        const result = await instance.query(
            `
            SELECT idProvincia, sum(votes)
            FROM ((
                SELECT idtipovoto, idmesa, votes 
                FROM votos) as v
                JOIN pscem ON pscem.idMesa = v.idMesa) AS vpscem
                WHERE idtipovoto = $1
                GROUP BY idProvincia;
        `,
            [idtipovoto]
        );
        let res2:{ [key: string]: any }  = {};
        result.rows.forEach((row) => {
            let id = row[0] as string;
            (res2 as any)[id] = {
                votos: parseInt((row[1] as bigint).toString()),
            };
        });
        return res2;
    } else {
        const result = await instance.query(
            `
            SELECT idProvincia , vpscem.idtipovoto, sum(votes)
            FROM ((
                SELECT idtipovoto, idmesa, votes 
                FROM votos) as v
                JOIN pscem ON pscem.idMesa = v.idMesa) AS vpscem
                GROUP BY idtipovoto, idProvincia;
            `
        );
        let res2:{ [key: string]: any[] }  = {};
        result.rows.forEach((row) => {
            let id = row[0] as string;
            if (!res2[id]) {
                res2[id] = [];
            }
            (res2 as any)[id].push({
                idtipovoto: row[1] as string,
                votos: parseInt((row[2] as bigint).toString()),
            });
        });
        return res2;
    }
}

export async function getTiposDeVotosCount(
    idProvincia: string,
    idtipovoto?: string
) {
    const instance = await DBSingleton.instance();

    if (idtipovoto) {
        const result = await instance.query(
            `
            SELECT SUM (votes) 
            FROM votos 
            WHERE idtipovoto = $1 AND idProvincia = $2
            `,
            [idtipovoto, idProvincia]
        );
        return result.rows.map((row) => {
            return { sum: parseInt((row[0] as bigint).toString()) };
        })[0];
    } else {
        const result = await instance.query(
            `
                SELECT vpscem.idtipovoto, sum(votes)
                FROM ((
                    SELECT idtipovoto, idmesa, votes 
                    FROM votos) as v
                    JOIN pscem ON pscem.idMesa = v.idMesa) AS vpscem
                    WHERE idProvincia = $1
                    GROUP BY idtipovoto;
                    `,
            [idProvincia]
        );
        return result.rows.map((row) => {
            return {
                idtipovoto: row[0] as string,
                votos: parseInt((row[1] as bigint).toString()),
            };
        });
    }
}

export async function getSeccionesFromProvincias(idProvincia: string, idSeccion?: string) {
    const instance = await DBSingleton.instance();

    if (idSeccion) {
        const result = await instance.query(
            `
            SELECT idProvincia, idSeccion FROM secciones WHERE idProvincia = $1 AND idSeccion = $2
            `, 
            [idProvincia, idSeccion]);
        return result.rows.map((row) => {
            return { idProvincia: row[0] as string, idSeccion: row[0] as string };
        })[0];
        
    } else {
        const result = await instance.query(
            `
            SELECT idProvincia, idSeccion FROM secciones WHERE idProvincia = $1
            `,
            [idProvincia]
        );
        return result.rows.map((row) => {
            return { idProvincia: row[0] as string, idSeccion: row[1] as string};
        });
    }
}

export async function getVotosFromAgrupacionByProvinciaAndCargo(idProvincia: string, idCargo:string, idAgrupacion?: string) {
    const instance = await DBSingleton.instance();

    if (idAgrupacion) {
        const result = await instance.query(
            `
            SELECT idagrupacion, sum(votes) FROM (
                SELECT * FROM votos JOIN pscem ON pscem.idMesa = votos.idMesa) AS vpscem
                WHERE idProvincia = $1
                AND idCargo = $2 AND idagrupacion = $3
                GROUP BY idagrupacion
            `, 
            [idProvincia, idCargo, idAgrupacion]);
        return result.rows.map((row) => {
            return { idAgrupacion: row[0] as string, votos: parseInt((row[1] as bigint).toString()) };
        })[0];
        
    } else {
        const result = await instance.query(
            `
            SELECT idagrupacion, sum(votes) FROM (
                SELECT * FROM votos JOIN pscem ON pscem.idMesa = votos.idMesa) AS vpscem
                WHERE idProvincia = $1
                AND idCargo = $2
                GROUP BY idagrupacion
            `,
            [idProvincia, idCargo]
        );
        return result.rows.map((row) => {
            return { idAgrupacion: row[0] as string, votos: parseInt((row[1] as bigint).toString())};
        });
    }
}
