// const HappyCoin = artifacts.require("HappyCoin");
const SendHappy = artifacts.require("SendHappy");

module.exports = async function(deployer) {

  // Deploy HappyCoin
  // await deployer.deploy(HappyCoin);
  // const happy = await HappyCoin.deployed()

  // Deploy SendHappy
  await deployer.deploy(SendHappy,'0xB0B924C4a31b7d4581a7F78F57ceE1E65736Be1D');// happy.address);
  const sendHappy = await SendHappy.deployed()

  // // Transfer all happy to deployer
  // const accounts = await web3.eth.getAccounts()
  // await happy.transfer(accounts[0], happy.totalSupply())
};
