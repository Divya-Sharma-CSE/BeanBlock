import { startServer } from "./app.js";
import { config, validateConfig } from "./config/env.js";
import { initializeContract } from "./services/contractService.js";
import logger from "./config/logger.js";

/**
 * Initialize and start the application
 */
const main = async () => {
  try {
    // Validate environment configuration
    validateConfig();
    logger.info("Environment configuration validated");

    // Initialize smart contract service
    logger.info("Initializing contract service...");
    await initializeContract();
    logger.info("Contract service initialized successfully");

    // Start Express server
    await startServer();
  } catch (error: any) {
    logger.error(`Fatal error during startup: ${error.message}`);
    process.exit(1);
  }
};

// Handle uncaught errors
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Start the application
main().catch((error) => {
  logger.error(`Application startup failed: ${error.message}`);
  process.exit(1);
});
