import { Router, Request, Response } from "express";
import { sendSuccess } from "../utils/helpers.js";
import { getProvider } from "../services/contractService.js";
import logger from "../config/logger.js";

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get("/health", (_req: Request, res: Response) => {
  sendSuccess(res, {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET /api/status
 * Detailed status check including blockchain connection
 */
router.get("/status", async (_req: Request, res: Response) => {
  try {
    const provider = await getProvider();
    const network = await provider.getNetwork();

    sendSuccess(res, {
      status: "operational",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      blockchain: {
        connected: true,
        network: network.name,
        chainId: network.chainId,
      },
    });
  } catch (error: any) {
    logger.error(`Status check error: ${error.message}`);
    sendSuccess(res, {
      status: "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      blockchain: {
        connected: false,
        error: error.message,
      },
    });
  }
});

export default router;
