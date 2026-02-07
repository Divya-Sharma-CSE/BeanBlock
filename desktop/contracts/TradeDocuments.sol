// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TradeDocuments is Ownable {

    // Fixed document types (judge-friendly)
    enum DocType {
        RetailReceipt,        // 0
        ProcessingInvoice,    // 1
        FarmCertificate,      // 2
        BillOfLading          // 3
    }

    struct Document {
        string cid;           // IPFS CID (immutable)
        address uploadedBy;   // Wallet that submitted
        uint256 timestamp;    // Block timestamp
    }

    struct ProductDocuments {
        mapping(uint8 => Document) docs;
        bool exists;
    }

    // productId => documents
    mapping(uint256 => ProductDocuments) private productDocs;

    /// EVENTS (IMPORTANT FOR FRONTEND + DEMO)
    event DocumentStored(
        uint256 indexed productId,
        DocType docType,
        string cid,
        address uploadedBy
    );

    constructor() Ownable(msg.sender) {}

    // ================= WRITE =================

    function storeDocument(
        uint256 productId,
        DocType docType,
        string calldata cid
    ) external {

        require(productId > 0, "Invalid product ID");
        require(bytes(cid).length > 0, "Empty CID");

        ProductDocuments storage pd = productDocs[productId];

        // Prevent overwrite (immutability)
        require(
            bytes(pd.docs[uint8(docType)].cid).length == 0,
            "Document already exists"
        );

        pd.docs[uint8(docType)] = Document({
            cid: cid,
            uploadedBy: msg.sender,
            timestamp: block.timestamp
        });

        pd.exists = true;

        emit DocumentStored(productId, docType, cid, msg.sender);
    }

    // ================= READ =================

    function getDocument(
        uint256 productId,
        DocType docType
    )
        external
        view
        returns (
            string memory cid,
            address uploadedBy,
            uint256 timestamp
        )
    {
        require(productDocs[productId].exists, "Product not found");

        Document memory d = productDocs[productId].docs[uint8(docType)];
        require(bytes(d.cid).length > 0, "Document not found");

        return (d.cid, d.uploadedBy, d.timestamp);
    }

    function isProductComplete(uint256 productId)
        external
        view
        returns (bool)
    {
        if (!productDocs[productId].exists) return false;

        for (uint8 i = 0; i < 4; i++) {
            if (bytes(productDocs[productId].docs[i].cid).length == 0) {
                return false;
            }
        }
        return true;
    }
}
