import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
  POSTGRES_TEST_DB,
} = process.env;
let db_connection!: pg.Pool;

if (ENV === 'dev') {
  db_connection = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: parseInt(POSTGRES_PORT as string),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === 'test') {
  db_connection = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    port: parseInt(POSTGRES_PORT as string),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default db_connection;
