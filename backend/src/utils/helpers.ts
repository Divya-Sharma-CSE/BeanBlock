import { Response } from "express";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  details?: any
) => {
  const response: ApiResponse = {
    success: false,
    error: {
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

/**
 * Convert wei to ether
 */
export const weiToEther = (wei: string | number): number => {
  return Number(wei) / 1e18;
};

/**
 * Convert ether to wei
 */
export const etherToWei = (ether: string | number): string => {
  return String(BigInt(ether as any) * BigInt(1e18));
};

/**
 * Format address for display
 */
export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Parse pagination params
 */
export const parsePaginationParams = (
  page?: string | number,
  limit?: string | number,
  defaultPage: number = 1,
  defaultLimit: number = 10,
  maxLimit: number = 100
) => {
  const parsedPage = Math.max(1, parseInt(String(page || defaultPage)));
  const parsedLimit = Math.min(
    maxLimit,
    Math.max(1, parseInt(String(limit || defaultLimit)))
  );
  const skip = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip,
  };
};

/**
 * Generate pagination metadata
 */
export const generatePaginationMeta = (
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  return {
    current: page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validate IPFS CID (v0 and v1)
 */
export const isValidIPFSCID = (cid: string): boolean => {
  // CIDv0: starts with Qm, 46 characters total
  // CIDv1: starts with bafy, 59+ characters
  return (
    /^Qm[a-zA-Z0-9]{44}$/.test(cid) || /^bafy[a-zA-Z0-9]+$/.test(cid)
  );
};

/**
 * Sleep utility for testing
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
