import { Router } from "express";
import { OrganizationController } from "../controllers/organization_controller";
import { validateRequest } from "../middleware/validate_request";
import {
  createOrganizationSchema,
  organizationIdSchema,
} from "../validators/organization_validator";

const router = Router();
const controller = new OrganizationController();

router.post(
  "/",
  validateRequest({ body: createOrganizationSchema }),
  controller.create.bind(controller),
);
router.get(
  "/:id",
  validateRequest({ params: organizationIdSchema }),
  controller.get.bind(controller),
);
router.get("/", controller.list.bind(controller));

export const organizationRoutes = router;
