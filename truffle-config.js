require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = [process.env.PRIVATE_KEY]

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: '*'
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKeys, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(privateKeys, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 3000000,
      gasPrice: 10000000000,
      networkCheckTimeout: 1000000000
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.6.12',
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
}
