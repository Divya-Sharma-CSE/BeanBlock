import { Router } from "express";
import * as documentController from "../controllers/documentController.js";
import {
  validateDocumentUpload,
  validateCarbonEmission,
  validateProductQuery,
} from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

/**
 * POST /api/documents/store
 * Store a document on blockchain
 */
router.post(
  "/store",
  validateDocumentUpload,
  asyncHandler(documentController.storeDocumentOnChain)
);

/**
 * GET /api/documents/:productId/:docType
 * Get document from blockchain
 */
router.get(
  "/:productId/:docType",
  asyncHandler(documentController.getDocumentFromChain)
);

/**
 * POST /api/documents/carbon
 * Set carbon emission for product
 */
router.post(
  "/carbon/set",
  validateCarbonEmission,
  asyncHandler(documentController.setCarbonEmissionOnChain)
);

/**
 * GET /api/documents/carbon/:productId
 * Get carbon emission data
 */
router.get(
  "/carbon/:productId",
  asyncHandler(documentController.getCarbonEmissionData)
);

/**
 * GET /api/documents/status/:productId
 * Check if product is complete
 */
router.get(
  "/status/:productId",
  asyncHandler(documentController.checkProductComplete)
);

/**
 * GET /api/documents/summary/:productId
 * Get complete product summary
 */
router.get(
  "/summary/:productId",
  asyncHandler(documentController.getProductSummary)
);

export default router;
