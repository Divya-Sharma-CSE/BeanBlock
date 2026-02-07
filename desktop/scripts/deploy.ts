const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const initialSupply = hre.ethers.parseUnits("1000", 18);
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(initialSupply);

  await token.waitForDeployment();

  console.log("MyToken deployed to:", token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
