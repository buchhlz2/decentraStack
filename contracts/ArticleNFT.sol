// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev extends ERC721 contract to mint articles as an NFT, as part of the decentraStack "DSTK" collection
 */
contract ArticleNFT is ERC721URIStorage, Ownable {
  string private _baseURIextended;

  // @dev Set the NFT base URI upon deployment
  constructor() ERC721("decentraStack", "DSTK") {
    _baseURIextended = "https://ipfs.io/ipfs/";
  }

  /** 
   * @dev emit an event whenever a new article is minted as an NFT
  */
  event MintedArticleNFT(address _owner, uint256 _tokenId, string _tokenURI);

  /**
   * @dev update the base URI in case of changes in future providers
   * @param baseURI_ new value, replacing _baseURIextended in storage
   */
  function setBaseURI(string memory baseURI_) external onlyOwner() {
    _baseURIextended = baseURI_;
  }

  /**
   * @dev override ERC721URIStorage function
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIextended;
  }

  /**
   * @dev calculate the unique NFT tokenId & mint the NFT
   * @param _author address of the article's authoring user
   * @param _title title of the original article
   * @param _contentIpfsHash ipfs hash, storing ONLY the content / body of the article
   */
  function createCollectible(address _author, string memory _title, string memory _contentIpfsHash) internal returns (uint256) {
    uint256 newArticleId = uint256(keccak256(abi.encodePacked(_author, _title, _contentIpfsHash, block.timestamp)));
    // Calls ERC721 with `newArticleId` as `tokenId`
    _safeMint(_author, newArticleId);
    // Calls ERC721URIStorage with `_contentIpfsHash` as the `tokenURI`
    _setTokenURI(newArticleId, _contentIpfsHash);
    
    emit MintedArticleNFT(_author, newArticleId, _contentIpfsHash);
    return newArticleId;
  }
}