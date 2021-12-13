import DBSingleton from "./db";

export async function getProvincias(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM provincias WHERE idProvincia = $1 LIMIT 1",
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
            FROM 
            WHERE id = $1 LIMIT 1
            `,
            [idProv]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        })[0];
    } else {
        const result = await instance.query(
            `
            SELECT * FROM provincias
            `
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        });
    }
}
