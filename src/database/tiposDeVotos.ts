import DBSingleton from "./db";

export async function getTiposDeVotos(id?: string) {
    const instance = await DBSingleton.instance();

    if (id) {
        const result = await instance.query(
            "SELECT * FROM tiposDeVotos WHERE id = $1 LIMIT 1",
            [id]
        );
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        })[0];
    } else {
        const result = await instance.query("SELECT * FROM tiposDeVotos");
        return result.rows.map((row) => {
            return { id: row[0] as string, name: row[1] as string };
        });
    }
}