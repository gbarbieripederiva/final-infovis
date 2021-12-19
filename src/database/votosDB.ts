import DBSingleton from "./db";

export async function getVotos(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM votos WHERE idvoto = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, 
                idagrupacion: row[1] as string, 
                idcargo: row[2] as string,
                idmesa: row[3] as string,
                idtipovoto: row[4] as string,
                votes: row[5] as string };
        })[0];
    } else {
        const result = await instance.query("SELECT SUM(votes) FROM votos");
        return result.rows.map((row) => {
            return { sum: (row[0] as bigint).toString()};
        });
    }
}