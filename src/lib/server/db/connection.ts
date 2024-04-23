import postgres from 'postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const sql = postgres(POSTGRES_URL);

export const db = drizzle(sql, { schema });
