import { Request, Response } from "express";
import * as ipfsService from "../services/ipfsService.js";
import { sendSuccess, sendError } from "../utils/helpers.js";
import logger from "../config/logger.js";

/**
 * Upload file to IPFS
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return sendError(res, "No file provided", 400);
    }

    const { originalname, buffer } = req.file;
    logger.info(`API: Uploading file to IPFS: ${originalname}`);

    const cid = await ipfsService.uploadToIPFS(buffer, originalname);

    const ipfsUrl = ipfsService.getIPFSUrl(cid);

    sendSuccess(res, {
      cid,
      url: ipfsUrl,
      filename: originalname,
      size: buffer.length,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to upload file", 500);
  }
};

/**
 * Upload JSON data to IPFS
 */
export const uploadJSON = async (req: Request, res: Response) => {
  try {
    const { data, filename = "data.json" } = req.body;

    if (!data) {
      return sendError(res, "No data provided", 400);
    }

    logger.info(`API: Uploading JSON to IPFS: ${filename}`);

    const cid = await ipfsService.uploadJSONToIPFS(data, filename);
    const ipfsUrl = ipfsService.getIPFSUrl(cid);

    sendSuccess(res, {
      cid,
      url: ipfsUrl,
      filename,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to upload JSON", 500);
  }
};

/**
 * Get file from IPFS
 */
export const getFromIPFS = async (req: Request, res: Response) => {
  try {
    const { cid } = req.query;

    if (!cid) {
      return sendError(res, "CID is required", 400);
    }

    logger.info(`API: Fetching from IPFS: ${cid}`);

    const data = await ipfsService.getFromIPFS(String(cid));

    sendSuccess(res, {
      cid,
      data,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    const statusCode = error.message?.includes("404") ? 404 : 500;
    sendError(res, error.message || "Failed to fetch from IPFS", statusCode);
  }
};

/**
 * Get IPFS gateway URL
 */
export const getIPFSUrl = async (req: Request, res: Response) => {
  try {
    const { cid } = req.query;

    if (!cid) {
      return sendError(res, "CID is required", 400);
    }

    logger.info(`API: Getting IPFS URL for CID: ${cid}`);

    const url = ipfsService.getIPFSUrl(String(cid));

    sendSuccess(res, {
      cid,
      url,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to generate URL", 500);
  }
};

/**
 * Pin content by hash
 */
export const pinContent = async (req: Request, res: Response) => {
  try {
    const { ipfsHash } = req.body;

    if (!ipfsHash) {
      return sendError(res, "IPFS hash is required", 400);
    }

    logger.info(`API: Pinning content: ${ipfsHash}`);

    await ipfsService.pinByHash(ipfsHash);

    sendSuccess(res, {
      ipfsHash,
      message: "Content pinned successfully",
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to pin content", 500);
  }
};

/**
 * Unpin content
 */
export const unpinContent = async (req: Request, res: Response) => {
  try {
    const { ipfsHash } = req.body;

    if (!ipfsHash) {
      return sendError(res, "IPFS hash is required", 400);
    }

    logger.info(`API: Unpinning content: ${ipfsHash}`);

    await ipfsService.unpinContent(ipfsHash);

    sendSuccess(res, {
      ipfsHash,
      message: "Content unpinned successfully",
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to unpin content", 500);
  }
};
