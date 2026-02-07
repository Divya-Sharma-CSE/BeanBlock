// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CarbonTracker
 * @dev Track carbon footprints for supply chain products
 * 
 * This is a reference implementation for the Carbon Verified frontend.
 * Deploy this contract to your preferred testnet (Sepolia, Mumbai, etc.)
 * and update the contract address in the frontend configuration.
 */

contract CarbonTracker {
    
    struct CarbonEntry {
        string stage;
        uint256 carbon;
        string timestamp;
        address recordedBy;
    }
    
    struct Batch {
        string batchId;
        string origin;
        uint256 totalCarbon;
        uint256 createdAt;
        address creator;
        bool exists;
    }
    
    // Mapping from numeric ID to Batch
    mapping(uint256 => Batch) public batches;
    
    // Mapping from batch numeric ID to array of carbon entries
    mapping(uint256 => CarbonEntry[]) public batchHistory;
    
    // Counter for batch IDs
    uint256 public batchCounter;
    
    // Events
    event BatchCreated(uint256 indexed batchNumericId, string batchId, string origin, address creator);
    event CarbonEntryAdded(uint256 indexed batchNumericId, string stage, uint256 carbon, address recordedBy);
    
    /**
     * @dev Create a new batch
     * @param batchId The unique identifier for the batch (e.g., "COFFEE-2026-001")
     * @param origin The origin location of the product
     * @return The numeric ID of the created batch
     */
    function createBatch(string memory batchId, string memory origin) public returns (uint256) {
        batchCounter++;
        uint256 newBatchId = batchCounter;
        
        batches[newBatchId] = Batch({
            batchId: batchId,
            origin: origin,
            totalCarbon: 0,
            createdAt: block.timestamp,
            creator: msg.sender,
            exists: true
        });
        
        emit BatchCreated(newBatchId, batchId, origin, msg.sender);
        return newBatchId;
    }
    
    /**
     * @dev Add a carbon entry for a specific stage
     * @param batchNumericId The numeric ID of the batch
     * @param stage The supply chain stage (e.g., "Farm", "Roast", "Transport", "Cup")
     * @param carbonAmount The amount of CO2 in grams (multiply kg by 1000)
     * @param timestamp The timestamp of the recording
     */
    function addCarbonEntry(
        uint256 batchNumericId,
        string memory stage,
        uint256 carbonAmount,
        string memory timestamp
    ) public {
        require(batches[batchNumericId].exists, "Batch does not exist");
        
        CarbonEntry memory newEntry = CarbonEntry({
            stage: stage,
            carbon: carbonAmount,
            timestamp: timestamp,
            recordedBy: msg.sender
        });
        
        batchHistory[batchNumericId].push(newEntry);
        batches[batchNumericId].totalCarbon += carbonAmount;
        
        emit CarbonEntryAdded(batchNumericId, stage, carbonAmount, msg.sender);
    }
    
    /**
     * @dev Get the total carbon footprint for a batch
     * @param batchNumericId The numeric ID of the batch
     * @return The total carbon in grams
     */
    function getBatchFootprint(uint256 batchNumericId) public view returns (uint256) {
        require(batches[batchNumericId].exists, "Batch does not exist");
        return batches[batchNumericId].totalCarbon;
    }
    
    /**
     * @dev Get the complete carbon history for a batch
     * @param batchNumericId The numeric ID of the batch
     * @return Array of carbon entries
     */
    function getBatchHistory(uint256 batchNumericId) public view returns (CarbonEntry[] memory) {
        require(batches[batchNumericId].exists, "Batch does not exist");
        return batchHistory[batchNumericId];
    }
    
    /**
     * @dev Get batch details
     * @param batchNumericId The numeric ID of the batch
     * @return Batch information
     */
    function getBatch(uint256 batchNumericId) public view returns (Batch memory) {
        require(batches[batchNumericId].exists, "Batch does not exist");
        return batches[batchNumericId];
    }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Install dependencies:
 *    npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
 * 
 * 2. Create hardhat.config.js:
 *    module.exports = {
 *      solidity: "0.8.20",
 *      networks: {
 *        sepolia: {
 *          url: process.env.SEPOLIA_RPC_URL,
 *          accounts: [process.env.PRIVATE_KEY]
 *        }
 *      }
 *    };
 * 
 * 3. Compile:
 *    npx hardhat compile
 * 
 * 4. Deploy:
 *    npx hardhat run scripts/deploy.js --network sepolia
 * 
 * 5. Update frontend:
 *    - Copy the deployed contract address
 *    - Update CONTRACT_ADDRESS in Web3Provider.tsx
 *    - Update CONTRACT_ABI with the generated ABI from artifacts/
 * 
 * 6. Verify on Etherscan:
 *    npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
 */
