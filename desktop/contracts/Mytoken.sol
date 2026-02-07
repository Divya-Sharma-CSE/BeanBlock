// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TradeDocuments is Ownable {
    struct Document {
        address owner;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) private documents;

    // Explicitly pass deployer as initial owner
    constructor() Ownable(msg.sender) {}

    // Store the hash of a trade document
    function storeDocumentHash(bytes32 hash) external {
        require(documents[hash].owner == address(0), "Document already exists");
        documents[hash] = Document(msg.sender, block.timestamp);
    }

    // Verify if a document exists
    function verifyDocument(bytes32 hash) external view returns (bool) {
        return documents[hash].owner != address(0);
    }

    // Get the owner of a document
    function getDocumentOwner(bytes32 hash) external view returns (address) {
        require(documents[hash].owner != address(0), "Document does not exist");
        return documents[hash].owner;
    }
}

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
