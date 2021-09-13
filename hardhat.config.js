// *future reference* for contract verification -- from command line, run:
/// npx hardhat verify --network <network> <deployed contract address>

require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()

module.exports = {
	solidity: {
		version: '0.8.4',
	},
	paths: {
		sources: './contracts',
		artifacts: './artifacts',
	},
	networks: {
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			chainId: 3, // Ropsten's id
			gas: 5500000, // Ropsten has a lower block limit than mainnet
		},
	},

	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}
