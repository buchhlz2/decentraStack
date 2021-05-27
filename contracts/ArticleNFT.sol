// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArticleNFT is ERC721URIStorage, Ownable {
  string private _baseURIextended;

  constructor() ERC721("decentraStack", "DSTK") {
    // TODO deploy script to call `setBaseURI` instead of constructor
    _baseURIextended = "https://ipfs.io/ipfs/";
  }

  event MintedArticleNFT(address _owner, uint256 _tokenId, string _tokenURI);

  function setBaseURI(string memory baseURI_) external onlyOwner() {
    _baseURIextended = baseURI_;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIextended;
  }

  function createCollectible(address _author, string memory _title, string memory _contentIpfsHash) internal returns (uint256) {
    uint256 newArticleId = uint256(keccak256(abi.encodePacked(_author, _title, _contentIpfsHash, block.timestamp)));
    // calls ERC721 with `newArticleId` as `tokenId`
    _safeMint(_author, newArticleId);
    // calls ERC721URIStorage with `_contentIpfsHash` as the `tokenURI`
    _setTokenURI(newArticleId, _contentIpfsHash);
    
    emit MintedArticleNFT(_author, newArticleId, _contentIpfsHash);
    return newArticleId;
  }
}