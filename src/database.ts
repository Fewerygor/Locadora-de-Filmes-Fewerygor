import { Client } from "pg";

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
});

export const connectData = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.log(error);
    }
};