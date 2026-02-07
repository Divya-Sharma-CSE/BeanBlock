const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy TradeDocuments
  const TradeDocuments = await hre.ethers.getContractFactory("TradeDocuments");
  const tradeDoc = await TradeDocuments.deploy();
  await tradeDoc.waitForDeployment();
  console.log("TradeDocuments deployed to:", tradeDoc.target);

  // Deploy MyToken
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const initialSupply = hre.ethers.parseUnits("1000", 18);
  const token = await MyToken.deploy(initialSupply);
  await token.waitForDeployment();
  console.log("MyToken deployed to:", token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
