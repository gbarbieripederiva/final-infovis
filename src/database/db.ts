import { Client } from "ts-postgres";

export class DBSingleton {
    private static _instance: Client | null = null;

    private static async generateClient(): Promise<Client> {
        let instance = new Client({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
                ? parseInt(process.env.DB_PORT)
                : undefined,
            keepAlive: true,
        });
        await instance.connect();
        process.on("beforeExit",async () => {
            if (!instance.closed) {
                await instance.end();
            }
        })
        return instance;
    }

    static async instance(): Promise<Client> {
        if (DBSingleton._instance == null) {
            DBSingleton._instance = await this.generateClient();
        }
        if (DBSingleton._instance.closed) {
            DBSingleton._instance = await this.generateClient();
        }
        return DBSingleton._instance;
    }
}

export default DBSingleton;
