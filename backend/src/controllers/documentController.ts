import { Request, Response } from "express";
import {
  storeDocument,
  getDocument,
  setCarbonEmission,
  getCarbonEmission,
  isProductComplete,
} from "../services/contractService.js";
import { sendSuccess, sendError } from "../utils/helpers.js";
import logger from "../config/logger.js";

/**
 * Store document on blockchain
 */
export const storeDocumentOnChain = async (req: Request, res: Response) => {
  try {
    const { productId, docType, cid } = req.body;

    logger.info(
      `API: Storing document for product ${productId}, type ${docType}`
    );

    const txHash = await storeDocument(productId, docType, cid);

    sendSuccess(res, {
      productId,
      docType,
      cid,
      transactionHash: txHash,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to store document", 500);
  }
};

/**
 * Get document from blockchain
 */
export const getDocumentFromChain = async (req: Request, res: Response) => {
  try {
    const { productId, docType } = req.query;

    logger.info(
      `API: Getting document for product ${productId}, type ${docType}`
    );

    const document = await getDocument(
      Number(productId),
      Number(docType)
    );

    sendSuccess(res, document);
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    const statusCode = error.message?.includes("not found") ? 404 : 500;
    sendError(res, error.message || "Failed to retrieve document", statusCode);
  }
};

/**
 * Set carbon emission for product
 */
export const setCarbonEmissionOnChain = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId, totalEmissions, unit = "kgCO2e" } = req.body;

    logger.info(`API: Setting carbon for product ${productId}: ${totalEmissions} ${unit}`);

    const txHash = await setCarbonEmission(
      productId,
      totalEmissions,
      unit
    );

    sendSuccess(res, {
      productId,
      totalEmissions,
      unit,
      transactionHash: txHash,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to set carbon emission", 500);
  }
};

/**
 * Get carbon emission data
 */
export const getCarbonEmissionData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;

    logger.info(`API: Getting carbon emission for product ${productId}`);

    const carbonData = await getCarbonEmission(Number(productId));

    sendSuccess(res, carbonData);
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    const statusCode = error.message?.includes("not set") ? 404 : 500;
    sendError(res, error.message || "Failed to retrieve carbon data", statusCode);
  }
};

/**
 * Check if product is complete
 */
export const checkProductComplete = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;

    logger.info(`API: Checking if product ${productId} is complete`);

    const isComplete = await isProductComplete(Number(productId));

    sendSuccess(res, {
      productId: Number(productId),
      isComplete,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to check product status", 500);
  }
};

/**
 * Get product summary (combines all info)
 */
export const getProductSummary = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;
    const id = Number(productId);

    logger.info(`API: Getting product summary for ${id}`);

    let carbonData = null;
    let documents = [];
    let isComplete = false;

    try {
      carbonData = await getCarbonEmission(id);
    } catch (e) {
      // Carbon data may not exist yet
    }

    try {
      isComplete = await isProductComplete(id);
    } catch (e) {
      // Completeness check may fail
    }

    sendSuccess(res, {
      productId: id,
      carbonData,
      isComplete,
    });
  } catch (error: any) {
    logger.error(`API Error: ${error.message}`);
    sendError(res, error.message || "Failed to get product summary", 500);
  }
};
