import DBSingleton from "./db";

export async function getSecciones(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM secciones WHERE idseccion = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, idProvincia: row[2] as string, name: row[3] as string };
        })[0];
    } else {
        const result = await instance.query(
            "SELECT * FROM secciones"
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, idProvincia: row[2] as string, name: row[3] as string };
        });
    }
}
