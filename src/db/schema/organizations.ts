import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Organizations table schema
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  plan: varchar("plan", { length: 50 }).default("free").notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),

  // Database connection details
  databaseName: varchar("database_name", { length: 255 }),
  databaseUrl: text("database_url"),
  databaseHostname: varchar("database_hostname", { length: 255 }),
  databaseToken: text("database_token"), // Consider encryption for this field
  databaseRegion: varchar("database_region", { length: 50 }),

  // Stack management
  pulumiStackName: varchar("pulumi_stack_name", { length: 255 }),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // For soft deletion
  isDeleted: boolean("is_deleted").default(false).notNull(),
});

// Type inference from the table schema
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

// Zod schemas for validation
export const insertOrganizationSchema = createInsertSchema(organizations, {
  name: z.string().min(2).max(255),
  email: z.string().email(),
  plan: z.enum(["free", "starter", "business", "enterprise"]).default("free"),
  // Other fields with custom validation as needed
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isDeleted: true,
    databaseName: true,
    databaseUrl: true,
    databaseHostname: true,
    databaseToken: true,
    databaseRegion: true,
    pulumiStackName: true,
    slug: true, // We'll generate this from the name
  })
  .partial({
    plan: true,
  });

// Schema for responses
export const organizationResponseSchema = createSelectSchema(
  organizations,
).omit({
  databaseToken: true, // Don't expose token in responses
});

// Create separate schema for database credentials when needed internally
export const organizationWithCredentialsSchema =
  createSelectSchema(organizations);
