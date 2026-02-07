// Contract utility functions and configurations

export const CONTRACT_CONFIG = {
  // Replace with your deployed contract address on testnet
  ADDRESS: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
  
  // Supported networks
  NETWORKS: {
    SEPOLIA: {
      chainId: '0xaa36a7',
      chainName: 'Sepolia Testnet',
      rpcUrl: 'https://rpc.sepolia.org',
      blockExplorer: 'https://sepolia.etherscan.io',
    },
    MUMBAI: {
      chainId: '0x13881',
      chainName: 'Mumbai Testnet',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com',
      blockExplorer: 'https://mumbai.polygonscan.com',
    },
  },
};

// Contract ABI - Replace with your actual contract ABI after deployment
export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'batchId', type: 'string' },
      { internalType: 'string', name: 'origin', type: 'string' },
    ],
    name: 'createBatch',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'batchId', type: 'uint256' },
      { internalType: 'string', name: 'stage', type: 'string' },
      { internalType: 'uint256', name: 'carbonAmount', type: 'uint256' },
      { internalType: 'string', name: 'timestamp', type: 'string' },
    ],
    name: 'addCarbonEntry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'batchId', type: 'uint256' }],
    name: 'getBatchFootprint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'batchId', type: 'uint256' }],
    name: 'getBatchHistory',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'stage', type: 'string' },
          { internalType: 'uint256', name: 'carbon', type: 'uint256' },
          { internalType: 'string', name: 'timestamp', type: 'string' },
        ],
        internalType: 'struct CarbonTracker.CarbonEntry[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

// Helper function to format carbon amount for display
export const formatCarbon = (amount: number): string => {
  return `${amount.toFixed(1)} kg CO₂`;
};

// Helper function to format wallet address
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper function to generate batch ID
export const generateBatchId = (prefix: string = 'COFFEE'): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${year}-${random}`;
};

// Sample supply chain stages
export const SUPPLY_CHAIN_STAGES = [
  {
    id: 'farm',
    name: 'Farm',
    description: 'Coffee beans grown and harvested',
  },
  {
    id: 'roast',
    name: 'Roast',
    description: 'Beans roasted to perfection',
  },
  {
    id: 'transport',
    name: 'Transport',
    description: 'Shipped to destination',
  },
  {
    id: 'cup',
    name: 'Cup',
    description: 'Ready to enjoy',
  },
];

// Industry benchmarks for carbon footprint (in kg CO₂)
export const CARBON_BENCHMARKS = {
  COFFEE_PER_KG: 9.7, // Industry average
  LOW_CARBON_THRESHOLD: 8.0,
  HIGH_CARBON_THRESHOLD: 12.0,
};

// Calculate carbon reduction percentage
export const calculateReduction = (actual: number): number => {
  const benchmark = CARBON_BENCHMARKS.COFFEE_PER_KG;
  return Math.round(((benchmark - actual) / benchmark) * 100);
};

// Validation helpers
export const isValidBatchId = (batchId: string): boolean => {
  return batchId.length > 3 && batchId.length < 50;
};

export const isValidCarbonAmount = (amount: number): boolean => {
  return amount > 0 && amount < 1000; // Reasonable range
};
