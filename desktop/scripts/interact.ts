import pkg from "hardhat";
const { ethers } = pkg;

import * as fs from "fs";


async function main() {
  const addresses = JSON.parse(
    fs.readFileSync("./deployed-address.json", "utf8")
  );

  const tradeDocs = await ethers.getContractAt(
    "TradeDocuments",
    addresses.TradeDocuments
  );

  const productId = 1;

  // SAMPLE IPFS CIDs (replace with UI input)
  const retailCID = "bafyRetailCID";
  const processingCID = "bafyProcessingCID";
  const farmCID = "bafyFarmCID";
  const bolCID = "bafyBOLCID";

  // 0 = RetailReceipt
  await tradeDocs.storeDocument(productId, 0, retailCID);
  console.log("Retail receipt stored");

  // 1 = ProcessingInvoice
  await tradeDocs.storeDocument(productId, 1, processingCID);
  console.log("Processing invoice stored");

  // 2 = FarmCertificate
  await tradeDocs.storeDocument(productId, 2, farmCID);
  console.log("Farm certificate stored");

  // 3 = BillOfLading
  await tradeDocs.storeDocument(productId, 3, bolCID);
  console.log("Bill of lading stored");

  const complete = await tradeDocs.isProductComplete(productId);
  console.log("Product verified:", complete);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
