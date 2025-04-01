import { db, organizations } from "../db";
import { Provisioner } from "../infra/provisioner";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class OrganizationService {
  private provisioner: Provisioner;

  constructor() {
    this.provisioner = new Provisioner();
  }

  async createOrganization(name: string) {
    const id = randomUUID();
    const { databaseUrl, authToken } =
      await this.provisioner.provisionDatabase(id);

    const organization = await db
      .insert(organizations)
      .values({
        id,
        name,
        databaseUrl,
        authToken,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return organization[0];
  }

  async getOrganization(id: string) {
    const organization = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .get();

    return organization;
  }

  async listOrganizations() {
    const organizationList = await db.select().from(organizations).all();

    return organizationList;
  }
}
