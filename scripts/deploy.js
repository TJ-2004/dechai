const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  const chai = await Chai.deploy(); //creating an instance of our smart contract

  chai.waitForDeployment();//deploying your smart contract

  console.log("Deployed contract address:", await chai.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x73B9618C1e3D851107c5D75e844CDc95e799e99e