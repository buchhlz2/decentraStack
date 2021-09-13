# decentraStack -- Decentralized Ethereum publishing platform

Application allows a user to create articles (as unique NFTs via ipfs) and view a feed of others articles published within the decentraStack ecosystem.

## Deployment

- Contracts on Ropsten testnet: [0x0511ad198d776Ed8D19fAf2C58E5109992f8AC73](https://ropsten.etherscan.io/address/0x0511ad198d776Ed8D19fAf2C58E5109992f8AC73)
- Frontend hosted on IPFS (deployed via Fleek): [ipfs](https://bafybeic4qfxuziehkq4uqvg7a4pdwluwtj4qgveaxkxl3hznzsn2ihjvsi.ipfs.dweb.link/) or [fleek domain](https://silent-frost-5466.on.fleek.co)
- View on IPLD @ IPFS CID: [QmUZkh1512Qu8zTfGufzosvzwDsuTynKX26DwxiYHmzdRj](https://explore.ipld.io/#/explore/QmUZkh1512Qu8zTfGufzosvzwDsuTynKX26DwxiYHmzdRj)

Note: when interacting with the frontend, a page refresh may be required (e.g., after connecting wallet and then swithing to the Ropsten testnet)

## Demo

![](demo/decentrastack_demo.gif)

## Smart Contract Details

- `Decentrastack` -- allows users to publish, subscribe/unsubscribe to/from other publishers, & view articles published by the user
- `ArticleNFT` -- inherits from OpenZeppelin ERC721 specification; creates article as an NFT, as part of the decentraStack "DSTK" collection, where a susbset of data is saved pinned to the IPFS network

## Available Scripts

In the root project directory, you can run:
`cd client && npm run start`
Runs the a React application.<br />

- Open [http://localhost:3000](http://localhost:3000) to run frontend

The Smart Contracts are currently only live locally and must be deployed as such. For example, to use Ganache, run the following in root to compile & deploy locally:
`truffle migrate`
