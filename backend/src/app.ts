import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import { config } from "./config/env.js";
import logger from "./config/logger.js";
import {
  errorHandler,
  notFound,
  requestLogger,
} from "./middleware/errorHandler.js";
import documentRoutes from "./routes/documentRoutes.js";
import ipfsRoutes from "./routes/ipfsRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

// ============== MIDDLEWARE ==============

// Security
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Compression
app.use(compression());

// Body parsing
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Logging
app.use(requestLogger);

// ============== ROUTES ==============

// Health check
app.use("/api", healthRoutes);

// API routes
app.use("/api/documents", documentRoutes);
app.use("/api/ipfs", ipfsRoutes);

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    name: "BeanBlock Backend API",
    version: "1.0.0",
    description: "Backend API for blockchain-based carbon tracking system",
    endpoints: {
      health: "/api/health",
      status: "/api/status",
      documents: "/api/documents",
      ipfs: "/api/ipfs",
    },
  });
});

// ============== ERROR HANDLING ==============

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ============== SERVER ==============

export const startServer = async () => {
  try {
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`API URL: ${config.apiUrl}`);
      logger.info(`Client URL: ${config.clientUrl}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

export default app;
