const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const EnergySettlement = await hre.ethers.getContractFactory("EnergySettlement");
  const contract = await EnergySettlement.deploy();
  await contract.deployed();

  console.log("EnergySettlement deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
