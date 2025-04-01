import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Define environment schema with validation
const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("3000"),

  // Database (PostgreSQL for storing organization data)
  DATABASE_URL: z.string().url(),

  // Turso configuration
  TURSO_ORG: z.string(),
  TURSO_API_TOKEN: z.string(),
  TURSO_DEFAULT_REGION: z.string().default("lhr"), // Default to London region
  TURSO_ADDITIONAL_REGIONS: z.string().default(""), // Comma-separated list of additional regions

  // Pulumi configuration
  PULUMI_CONFIG_PASSPHRASE: z.string().optional(),

  // Auth & Security
  API_KEY_SECRET: z.string().optional(),
  ACCESS_TOKEN_SECRET: z.string().optional(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("60000"),
  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("10"),
});

// Parse and validate environment variables
const parseEnvResult = envSchema.safeParse(process.env);

// Handle validation errors
if (!parseEnvResult.success) {
  console.error("❌ Invalid environment variables:");
  for (const error of parseEnvResult.error.errors) {
    console.error(`  - ${error.path}: ${error.message}`);
  }
  process.exit(1);
}

// Export typed environment configuration
export const env = parseEnvResult.data;

// Helper for getting Turso regions as array
export const getTursoRegions = (): string[] => {
  const additionalRegions = env.TURSO_ADDITIONAL_REGIONS.split(",")
    .map((region) => region.trim())
    .filter(Boolean);

  return [env.TURSO_DEFAULT_REGION, ...additionalRegions];
};
