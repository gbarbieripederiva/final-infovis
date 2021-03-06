import DBSingleton from "./db";

export async function getCargos(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM cargos WHERE idcargo = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        })[0];
    } else {
        const result = await instance.query(
            "SELECT * FROM cargos"
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        });
    }
}
