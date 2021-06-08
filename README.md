# decentraStack -- Decentralized Ethereum publishing platform

Application allows a user to create articles (as unique NFTs via ipfs) and view a feed of others articles published within the decentraStack ecosystem.

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
