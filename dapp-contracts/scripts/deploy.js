const { ethers } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const initialSupply = 1000000;
  
  // Deploy MyToken
  const myToken = await deploy("MyToken", {
    from: deployer,
    args: [initialSupply],
    log: true,
  });

  console.log("MyToken deployed to:", myToken.address);

  // Deploy Voting
  const voting = await deploy("Voting", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("Voting deployed to:", voting.address);
};

module.exports.tags = ["all", "voting"];