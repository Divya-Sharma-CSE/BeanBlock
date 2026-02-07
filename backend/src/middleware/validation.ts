import { Request, Response, NextFunction } from "express";
import { validationResult, body, query } from "express-validator";

/**
 * Handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for document upload
 */
export const validateDocumentUpload = [
  body("productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  body("docType")
    .isInt({ min: 0, max: 3 })
    .withMessage("Document type must be 0-3"),
  body("cid")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("IPFS CID is required"),
  handleValidationErrors,
];

/**
 * Validation rules for carbon emission
 */
export const validateCarbonEmission = [
  body("productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  body("totalEmissions")
    .isInt({ min: 1 })
    .withMessage("Total emissions must be a positive integer"),
  body("unit")
    .optional()
    .isString()
    .withMessage("Unit must be a string"),
  handleValidationErrors,
];

/**
 * Validation rules for file upload
 */
export const validateFileUpload = [
  body("productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  body("docType")
    .isInt({ min: 0, max: 3 })
    .withMessage("Document type must be 0-3"),
  handleValidationErrors,
];

/**
 * Validation rules for product query
 */
export const validateProductQuery = [
  query("productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  handleValidationErrors,
];

/**
 * Validation rules for batch creation
 */
export const validateBatchCreation = [
  body("batchId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Batch ID is required")
    .isLength({ max: 100 })
    .withMessage("Batch ID must be less than 100 characters"),
  body("origin")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Origin is required")
    .isLength({ max: 100 })
    .withMessage("Origin must be less than 100 characters"),
  handleValidationErrors,
];

/**
 * Validation rules for carbon entry
 */
export const validateCarbonEntry = [
  body("batchId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Batch ID is required"),
  body("stage")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Stage is required"),
  body("carbonAmount")
    .isInt({ min: 0 })
    .withMessage("Carbon amount must be a non-negative integer"),
  handleValidationErrors,
];
