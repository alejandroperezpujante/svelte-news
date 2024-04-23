import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!
	},
	verbose: true,
	strict: true
});
