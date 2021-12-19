import DBSingleton from "./db";

export async function getTiposDeVotos(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM tiposvotos WHERE idtipovoto = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        })[0];
    } else {
        const result = await instance.query("SELECT * FROM tiposvotos");
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        });
    }
}

export async function getTiposDeVotosCount(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT SUM (votes) FROM votos WHERE idtipovoto = $1",
            [id]
        );
        return result.rows.map((row) => {
            return { sum: (row[0] as bigint).toString()};
        })[0];
    } else {
        const result = await instance.query(
            `
            SELECT v.idtipovoto, tipovoto, sum as votes 
            FROM ((
                SELECT idtipovoto, SUM (votes) 
                FROM votos group by idtipovoto) as v 
                LEFT JOIN tiposvotos tv ON v.idtipovoto = tv.idtipovoto);
            `);
        return result.rows.map((row) => {
            return { id: row[0] as string, tipovoto: row[1] as string, count: (row[2] as bigint).toString() };
        });
    }
}