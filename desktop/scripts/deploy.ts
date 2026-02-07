import pkg from "hardhat";
const { ethers } = pkg;

import * as fs from "fs";

async function main() {
  const TradeDocuments = await ethers.getContractFactory("TradeDocuments");

  const tradeDocs = await TradeDocuments.deploy();
  await tradeDocs.waitForDeployment();

  const address = await tradeDocs.getAddress();
  console.log("TradeDocuments deployed to:", address);

  fs.writeFileSync(
    "./deployed-address.json",
    JSON.stringify({ TradeDocuments: address }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
