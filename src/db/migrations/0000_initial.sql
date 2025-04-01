-- Create organizations table
CREATE TABLE IF NOT EXISTS "organizations" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "plan" VARCHAR(50) NOT NULL DEFAULT 'free',
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "database_name" VARCHAR(255),
    "database_url" TEXT,
    "database_hostname" VARCHAR(255),
    "database_token" TEXT,
    "database_region" VARCHAR(50),
    "pulumi_stack_name" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS "organizations_slug_idx" ON "organizations" ("slug");
CREATE INDEX IF NOT EXISTS "organizations_status_idx" ON "organizations" ("status");
CREATE INDEX IF NOT EXISTS "organizations_is_deleted_idx" ON "organizations" ("is_deleted");

-- Add timestamp trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_organizations_modtime
    BEFORE UPDATE ON "organizations"
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column(); 