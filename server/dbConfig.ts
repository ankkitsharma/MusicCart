import { Pool } from "pg";
import { config } from "dotenv";

config();

// Initialize pg pool middleware for working with psql db
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export default pool;
