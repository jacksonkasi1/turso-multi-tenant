import express, { ErrorRequestHandler } from "express";
import { env } from "./config/environment";
import { organizationRoutes } from "./api/routes/organization_routes";
import { errorHandler } from "./api/middleware/error_handler";
import { rateLimiter } from "./api/middleware/rate_limiter";
import { logger } from "./utils/logger";

const app = express();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/organizations", organizationRoutes);

// Error handling
app.use(errorHandler as ErrorRequestHandler);

// Start server
app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
