import * as pulumi from "@pulumi/pulumi";

import { TursoDB } from "./pulumi/turso_db";
import { env } from "../config/environment";

export class Provisioner {
  private stack: pulumi.StackReference;

  constructor() {
    this.stack = new pulumi.StackReference("turso/turso/dev");
  }

  async provisionDatabase(name: string): Promise<{
    databaseUrl: string;
    authToken: string;
  }> {
    const db = new TursoDB(`${name}-db`, { name });
    
    const outputs = await Promise.all([
      db.databaseUrl.apply((url) => url),
      db.authToken.apply((token) => token),
    ]);

    return {
      databaseUrl: outputs[0],
      authToken: outputs[1],
    };
  }
}