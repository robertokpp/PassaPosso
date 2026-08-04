import pg from "pg";
import { env } from "../config/env.js";

export const database = new pg.Pool({
  connectionString: env.databaseUrl,
});

