import axios from "axios";
import FormData from "form-data";
import { config } from "../config/env.js";
import logger from "../config/logger.js";

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

/**
 * Upload file to IPFS via Pinata
 */
export const uploadToIPFS = async (
  fileBuffer: Buffer,
  filename: string
): Promise<string> => {
  try {
    if (!config.pinataJwt) {
      throw new Error("Pinata JWT not configured");
    }

    logger.info(`Uploading file to IPFS: ${filename}`);

    const formData = new FormData();
    formData.append("file", fileBuffer, filename);

    const response = await axios.post<PinataResponse>(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${config.pinataJwt}`,
        },
      }
    );

    const cid = response.data.IpfsHash;
    logger.info(`File uploaded successfully. CID: ${cid}`);

    return cid;
  } catch (error) {
    logger.error(`Error uploading to IPFS: ${error}`);
    throw error;
  }
};

/**
 * Upload JSON data to IPFS via Pinata
 */
export const uploadJSONToIPFS = async (
  data: any,
  filename: string = "data.json"
): Promise<string> => {
  try {
    if (!config.pinataJwt) {
      throw new Error("Pinata JWT not configured");
    }

    logger.info(`Uploading JSON to IPFS: ${filename}`);

    const jsonString = JSON.stringify(data);
    const fileBuffer = Buffer.from(jsonString);

    const formData = new FormData();
    formData.append("file", fileBuffer, filename);

    const response = await axios.post<PinataResponse>(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${config.pinataJwt}`,
        },
      }
    );

    const cid = response.data.IpfsHash;
    logger.info(`JSON uploaded successfully. CID: ${cid}`);

    return cid;
  } catch (error) {
    logger.error(`Error uploading JSON to IPFS: ${error}`);
    throw error;
  }
};

/**
 * Get file from IPFS via gateway
 */
export const getFromIPFS = async (cid: string): Promise<any> => {
  try {
    logger.info(`Fetching from IPFS: ${cid}`);

    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`, {
      timeout: 10000,
    });

    logger.info(`Successfully fetched from IPFS: ${cid}`);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching from IPFS: ${error}`);
    throw error;
  }
};

/**
 * Pin content to IPFS by hash
 */
export const pinByHash = async (ipfsHash: string): Promise<void> => {
  try {
    if (!config.pinataApiKey || !config.pinataApiSecret) {
      throw new Error("Pinata API credentials not configured");
    }

    logger.info(`Pinning hash to IPFS: ${ipfsHash}`);

    await axios.post(
      "https://api.pinata.cloud/pinning/pinByHash",
      {
        hashToPin: ipfsHash,
      },
      {
        headers: {
          pinata_api_key: config.pinataApiKey,
          pinata_secret_api_key: config.pinataApiSecret,
        },
      }
    );

    logger.info(`Hash pinned successfully: ${ipfsHash}`);
  } catch (error) {
    logger.error(`Error pinning hash: ${error}`);
    throw error;
  }
};

/**
 * Unpin content from Pinata (optional cleanup)
 */
export const unpinContent = async (ipfsHash: string): Promise<void> => {
  try {
    if (!config.pinataApiKey || !config.pinataApiSecret) {
      throw new Error("Pinata API credentials not configured");
    }

    logger.info(`Unpinning content from Pinata: ${ipfsHash}`);

    await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
      headers: {
        pinata_api_key: config.pinataApiKey,
        pinata_secret_api_key: config.pinataApiSecret,
      },
    });

    logger.info(`Content unpinned successfully: ${ipfsHash}`);
  } catch (error) {
    logger.error(`Error unpinning content: ${error}`);
    throw error;
  }
};

/**
 * Create IPFS gateway URL
 */
export const getIPFSUrl = (cid: string): string => {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};
