# decentraStack -- Decentralized Ethereum publishing platform

Application allows a user to create articles (as unique NFTs via ipfs) and view a feed of others articles published within the decentraStack ecosystem.

## Deployment

- Contracts on Ropsten testnet: [0x0511ad198d776Ed8D19fAf2C58E5109992f8AC73](https://ropsten.etherscan.io/address/0x0511ad198d776Ed8D19fAf2C58E5109992f8AC73)
- Frontend hosted on ipfs: [here](https://bafybeiahvztihe3zimh7g3nxpjdived5goyt5kmgdt2mdmsih6lzc7binq.ipfs.dweb.link/)
- Deployed by Fleek @ ipfs hash: [QmNrdob7Q92q4yGHwXM7enCtWwNqBD3iWAYYNp94i5pf5u](https://ipfs.fleek.co/ipfs/QmNrdob7Q92q4yGHwXM7enCtWwNqBD3iWAYYNp94i5pf5u/)

## Demo

![](demo/decentrastack_demo.gif)

## Smart Contract Details

- `Decentrastack` -- allows users to publish, subscribe/unsubscribe to/from other publishers, & view articles published by the user
- `ArticleNFT` -- inherits from OpenZeppelin ERC721 specification; creates NFT as an article, as part of the decentraStack "DSTK" collection, onto the ipfs network

## Available Scripts

In the root project directory, you can run:
`cd client && npm run start`
Runs the a React application.<br />

- Open [http://localhost:3000](http://localhost:3000) to run frontend

The Smart Contracts are currently only live locally and must be deployed as such. For example, to use Ganache, run the following in root to compile & deploy locally:
`truffle migrate`
