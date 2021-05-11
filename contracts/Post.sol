// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Post {
  address author;
  string title;
  string body;
  uint256 date;
  bytes32 postId;

  event PostCreated(address _author, string _title, string _body, uint256 _date, bytes32 _postId);

  function createPost(string memory _title, string memory _body) public {
    author = msg.sender;
    title = _title;
    body = _body;
    date = now;
    postId = keccak256(abi.encodePacked(author, title, body, date));

    emit PostCreated(author, title, body, date, postId);
  }

  // function getPost() public view returns (address, string, string, uint256, bytes32) {
  //   return (author, title, body, date, postId);
  // }
}
