import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000"),
  nodeEnv: process.env.NODE_ENV || "development",
  apiUrl: process.env.API_URL || "http://localhost:3000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  // Web3 Configuration
  rpcUrl: process.env.RPC_URL || "http://localhost:8545",
  privateKey: process.env.PRIVATE_KEY || "",
  chainId: parseInt(process.env.CHAIN_ID || "11155111"), // Sepolia default

  // Contract Configuration
  contractAddress: process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  contractPath: process.env.CONTRACT_PATH || "../../../desktop/artifacts/contracts/TradeDocuments.sol/TradeDocuments.json",

  // IPFS/Pinata Configuration
  pinataApiKey: process.env.PINATA_API_KEY || "",
  pinataApiSecret: process.env.PINATA_API_SECRET || "",
  pinataJwt: process.env.PINATA_JWT || "",

  // Database Configuration
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/beanblock",

  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || "your-super-secret-key-change-this",
  jwtExpiration: process.env.JWT_EXPIRATION || "7d",

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || ["http://localhost:5173", "http://localhost:3000"],
};

// Validate critical environment variables
export const validateConfig = () => {
  if (config.nodeEnv === "production") {
    const requiredVars = [
      "RPC_URL",
      "CONTRACT_ADDRESS",
      "PINATA_JWT",
      "JWT_SECRET",
    ];
    const missing = requiredVars.filter((v) => !process.env[v]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
  }
};
