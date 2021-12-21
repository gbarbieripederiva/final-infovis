import DBSingleton from "./db";

export async function getVotos() {
    const instance = await DBSingleton.instance();
    const result = await instance.query("SELECT SUM(votes) FROM votos");
    return result.rows.map((row) => {
        return { sum: parseInt((row[0] as bigint).toString())};
    })[0];
}