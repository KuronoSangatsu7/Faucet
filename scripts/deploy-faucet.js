const hre = require("hardhat");

async function main() {
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
  
    await faucet.deployed();
  
    console.log("Faucet deployed to:", faucet.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  