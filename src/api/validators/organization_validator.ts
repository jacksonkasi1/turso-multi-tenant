import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
});

export const organizationIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;
export type OrganizationIdDto = z.infer<typeof organizationIdSchema>;
