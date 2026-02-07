import { ethers } from "ethers";
import { config } from "../config/env.js";
import logger from "../config/logger.js";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

interface ContractInstance {
  address: string;
  contract: ethers.Contract;
  provider: ethers.JsonRpcProvider;
  signer: ethers.Wallet | null;
}

let contractInstance: ContractInstance | null = null;

/**
 * Load contract ABI from artifacts
 */
export const loadContractABI = (): any => {
  try {
    const abiPath = join(__dirname, config.contractPath);
    const artifactData = JSON.parse(readFileSync(abiPath, "utf-8"));
    return artifactData.abi;
  } catch (error) {
    logger.warn(
      `Could not load ABI from file, using minimal ABI. Error: ${error}`
    );
    // Minimal ABI for TradeDocuments contract
    return [
      {
        inputs: [
          { name: "productId", type: "uint256" },
          { name: "docType", type: "uint8" },
          { name: "cid", type: "string" },
        ],
        name: "storeDocument",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { name: "productId", type: "uint256" },
          { name: "totalEmissions", type: "uint256" },
          { name: "unit", type: "string" },
        ],
        name: "setCarbonEmission",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { name: "productId", type: "uint256" },
          { name: "docType", type: "uint8" },
        ],
        name: "getDocument",
        outputs: [
          { name: "cid", type: "string" },
          { name: "uploadedBy", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ name: "productId", type: "uint256" }],
        name: "getCarbonEmission",
        outputs: [
          { name: "totalEmissions", type: "uint256" },
          { name: "unit", type: "string" },
          { name: "reportedBy", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ name: "productId", type: "uint256" }],
        name: "isProductComplete",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
    ];
  }
};

/**
 * Initialize contract instance
 */
export const initializeContract = async (): Promise<ContractInstance> => {
  if (contractInstance) {
    return contractInstance;
  }

  try {
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // Test connection
    const network = await provider.getNetwork();
    logger.info(`Connected to network: ${network.name} (chainId: ${network.chainId})`);

    const abi = loadContractABI();

    let signer: ethers.Wallet | null = null;
    if (config.privateKey) {
      signer = new ethers.Wallet(config.privateKey, provider);
      logger.info(`Signer initialized: ${signer.address}`);
    }

    const contract = new ethers.Contract(
      config.contractAddress,
      abi,
      signer || provider
    );

    contractInstance = {
      address: config.contractAddress,
      contract,
      provider,
      signer,
    };

    logger.info(`Contract initialized at ${config.contractAddress}`);
    return contractInstance;
  } catch (error) {
    logger.error(`Failed to initialize contract: ${error}`);
    throw error;
  }
};

/**
 * Get contract instance (creates if doesn't exist)
 */
export const getContractInstance = async (): Promise<ContractInstance> => {
  if (!contractInstance) {
    await initializeContract();
  }
  return contractInstance!;
};

/**
 * Store document on blockchain
 */
export const storeDocument = async (
  productId: number,
  docType: number,
  cid: string
): Promise<string> => {
  try {
    const { contract } = await getContractInstance();

    logger.info(`Storing document for product ${productId}, type ${docType}, CID: ${cid}`);

    const tx = await contract.storeDocument(productId, docType, cid);
    const receipt = await tx.wait();

    logger.info(`Document stored. Transaction hash: ${receipt.hash}`);
    return receipt.hash;
  } catch (error) {
    logger.error(`Error storing document: ${error}`);
    throw error;
  }
};

/**
 * Set carbon emission for a product
 */
export const setCarbonEmission = async (
  productId: number,
  totalEmissions: number,
  unit: string = "kgCO2e"
): Promise<string> => {
  try {
    const { contract } = await getContractInstance();

    logger.info(`Setting carbon emission for product ${productId}: ${totalEmissions} ${unit}`);

    const tx = await contract.setCarbonEmission(productId, totalEmissions, unit);
    const receipt = await tx.wait();

    logger.info(`Carbon emission set. Transaction hash: ${receipt.hash}`);
    return receipt.hash;
  } catch (error) {
    logger.error(`Error setting carbon emission: ${error}`);
    throw error;
  }
};

/**
 * Get document from blockchain
 */
export const getDocument = async (
  productId: number,
  docType: number
): Promise<{
  cid: string;
  uploadedBy: string;
  timestamp: number;
}> => {
  try {
    const { contract } = await getContractInstance();

    logger.info(`Fetching document for product ${productId}, type ${docType}`);

    const [cid, uploadedBy, timestamp] = await contract.getDocument(
      productId,
      docType
    );

    return {
      cid,
      uploadedBy,
      timestamp: Number(timestamp),
    };
  } catch (error) {
    logger.error(`Error getting document: ${error}`);
    throw error;
  }
};

/**
 * Get carbon emission data
 */
export const getCarbonEmission = async (
  productId: number
): Promise<{
  totalEmissions: number;
  unit: string;
  reportedBy: string;
  timestamp: number;
}> => {
  try {
    const { contract } = await getContractInstance();

    logger.info(`Fetching carbon emission for product ${productId}`);

    const [totalEmissions, unit, reportedBy, timestamp] =
      await contract.getCarbonEmission(productId);

    return {
      totalEmissions: Number(totalEmissions),
      unit,
      reportedBy,
      timestamp: Number(timestamp),
    };
  } catch (error) {
    logger.error(`Error getting carbon emission: ${error}`);
    throw error;
  }
};

/**
 * Check if product is complete
 */
export const isProductComplete = async (productId: number): Promise<boolean> => {
  try {
    const { contract } = await getContractInstance();

    logger.info(`Checking if product ${productId} is complete`);

    const isComplete = await contract.isProductComplete(productId);
    return isComplete;
  } catch (error) {
    logger.error(`Error checking product completeness: ${error}`);
    throw error;
  }
};

/**
 * Get provider for read-only operations
 */
export const getProvider = async (): Promise<ethers.JsonRpcProvider> => {
  const { provider } = await getContractInstance();
  return provider;
};
