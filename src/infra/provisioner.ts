import * as pulumi from "@pulumi/pulumi";

import { TursoDB } from "./pulumi/turso_db";

export class Provisioner {
  private stack: pulumi.StackReference;

  constructor() {
    this.stack = new pulumi.StackReference("turso/turso/dev");
  }

  async provisionDatabase(name: string): Promise<{
    databaseUrl: pulumi.Output<string>;
    authToken: pulumi.Output<string>;
  }> {
    const db = new TursoDB(`${name}-db`, { name });

    return {
      databaseUrl: db.databaseUrl,
      authToken: db.authToken,
    };
  }
}
