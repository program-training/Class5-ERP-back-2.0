import { Client } from "pg";
import "dotenv/config";

export const client = new Client({
  connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
});

export const connectionToPostgres = async () => {
  try {
    await client.connect();
    return "connected to Postgres";
  } catch (error) {
    return Promise.reject(error);
  }
};
