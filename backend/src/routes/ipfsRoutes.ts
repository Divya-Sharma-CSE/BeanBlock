import { Router } from "express";
import * as ipfsController from "../controllers/ipfsController.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import multer from "multer";

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
});

/**
 * POST /api/ipfs/upload
 * Upload file to IPFS
 */
router.post(
  "/upload",
  upload.single("file"),
  asyncHandler(ipfsController.uploadFile)
);

/**
 * POST /api/ipfs/upload-json
 * Upload JSON data to IPFS
 */
router.post(
  "/upload-json",
  asyncHandler(ipfsController.uploadJSON)
);

/**
 * GET /api/ipfs/get
 * Get file from IPFS by CID
 */
router.get(
  "/get",
  asyncHandler(ipfsController.getFromIPFS)
);

/**
 * GET /api/ipfs/url
 * Get IPFS gateway URL for CID
 */
router.get(
  "/url",
  asyncHandler(ipfsController.getIPFSUrl)
);

/**
 * POST /api/ipfs/pin
 * Pin content by hash
 */
router.post(
  "/pin",
  asyncHandler(ipfsController.pinContent)
);

/**
 * POST /api/ipfs/unpin
 * Unpin content
 */
router.post(
  "/unpin",
  asyncHandler(ipfsController.unpinContent)
);

export default router;
