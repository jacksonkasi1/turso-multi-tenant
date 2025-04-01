import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { logger } from "../utils/logger";
import { env } from "./environment";

// Create postgres connection
const queryClient = postgres(env.DATABASE_URL, {
  max: 10, // Connection pool size
  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Create drizzle DB instance
export const db = drizzle(queryClient);

// Function to run migrations
export const runMigrations = async () => {
  logger.info("Running database migrations...");

  try {
    await migrate(db, { migrationsFolder: "drizzle/migrations" });
    logger.info("Migrations completed successfully");
  } catch (error) {
    logger.error("Migration failed:", error);
    throw error;
  }
};

// Helper function to connect to a specific organization's Turso database
export const connectToOrgDatabase = async (dbUrl: string) => {
  // This function would connect to the organization's Turso database
  // Implementation depends on Turso client library
  // For now it's a placeholder as we'll configure this later

  logger.info(`Connecting to organization database at ${dbUrl}`);
  return {
    connect: async () => {
      logger.info("Connected to organization database");
      // Return connection or client
      return {};
    },
  };
};
