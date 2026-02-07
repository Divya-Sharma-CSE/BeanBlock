// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BeanBlockTracker {
    enum Stage {
        Farm,
        Processing,
        Transport,
        Retail
    }

    struct CarbonEntry {
        Stage stage;
        uint256 carbon; // kg CO2
        string documentHash;
        uint256 timestamp;
    }

    CarbonEntry[] public history;
    bool public batchInitialized;

    event CarbonAdded(Stage stage, uint256 carbon, string documentHash);

    function initializeBatch() public {
        require(!batchInitialized, "Batch already initialized");
        batchInitialized = true;
    }

    function addCarbonEntry(
        Stage stage,
        uint256 carbon,
        string memory documentHash
    ) public {
        require(batchInitialized, "Batch not initialized");

        history.push(
            CarbonEntry({
                stage: stage,
                carbon: carbon,
                documentHash: documentHash,
                timestamp: block.timestamp
            })
        );

        emit CarbonAdded(stage, carbon, documentHash);
    }

    function getTotalCarbon() public view returns (uint256 total) {
        for (uint256 i = 0; i < history.length; i++) {
            total += history[i].carbon;
        }
    }

    function getHistoryCount() public view returns (uint256) {
        return history.length;
    }
}

