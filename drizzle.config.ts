import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

export default {
  schema: './src/db/schema/*',
  out: './drizzle/migrations',
  driver: 'pg', // 'pg' for PostgreSQL
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  // Customize table names (optional)
  tablesFilter: ['!_migrations'],
} satisfies Config; 