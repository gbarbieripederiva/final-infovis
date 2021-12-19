import DBSingleton from "./db";

export async function getAgrupaciones(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM agrupaciones WHERE idagrupacion = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[2] as string };
        })[0];
    } else {
        const result = await instance.query("SELECT * FROM agrupaciones");
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[2] as string };
        });
    }
}