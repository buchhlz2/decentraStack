// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Post {
  // get all articles ever written
  Article[] public articles;
  
  struct Article {
    address author;
    string title; // TODO max characters for an article title *should be* 70
    string body;
    uint256 date;
    bytes32 postId;
  }

  // @dev consider adding index variable for each array; to help with lookups instead of for loop
  mapping(address => Article[]) public authorToArticles;
  mapping(address => address[]) public usersToSubscribedAuthors;

  event PostCreated(address _author, string _title, string _body, uint256 _date, bytes32 _postId);
  event NewUserSubscription(address _follower, address _author);
  event UserUnsubscribedFromAuthor(address _follower, address _author);

  function createPost(string memory _title, string memory _body) public {
    Article memory newArticle = Article({
      author: msg.sender,
      title: _title,
      body: _body,
      date: now,
      postId: keccak256(abi.encodePacked(msg.sender, _title, _body, now))
    });

    authorToArticles[msg.sender].push(newArticle);
    articles.push(newArticle);
    
    emit PostCreated(newArticle.author, newArticle.title, newArticle.body, newArticle.date, newArticle.postId);
  }

  function getArticles() public view returns(Article[] memory) {
      return articles;
  }

  // subscribe to author
  function subscribeToAuthor(address _author) public {
    require(_author != address(0), 'Invalid author');
    require(_author != msg.sender, 'Author cannot subscribe to itself');
    bool alreadySubscribed = false;
    for(uint i = 0; i < usersToSubscribedAuthors[msg.sender].length; i++) {
      if(usersToSubscribedAuthors[msg.sender][i] == _author) {
        alreadySubscribed = true;
        break;
      }
    }
    if(!alreadySubscribed) {
        usersToSubscribedAuthors[msg.sender].push(_author);
        emit NewUserSubscription(msg.sender, _author);
    }
  }

  // unsubscribe from author
  function unsubscribeFromAuthor(address _author) public {
    require(_author != address(0), 'Invalid _author');
    for(uint i = 0; i < usersToSubscribedAuthors[msg.sender].length; i++) {
      if(usersToSubscribedAuthors[msg.sender][i] == _author) {
        // swap index with the last item in the array and then `delete` & shorten array
        // @dev this is to prevent 0x0 value being written to author & bloating array
        usersToSubscribedAuthors[msg.sender][i] = usersToSubscribedAuthors[msg.sender][usersToSubscribedAuthors[msg.sender].length - 1];
        delete usersToSubscribedAuthors[msg.sender][usersToSubscribedAuthors[msg.sender].length - 1];
        usersToSubscribedAuthors[msg.sender].length--;
        emit UserUnsubscribedFromAuthor(msg.sender, _author);
        break;
      }
    }
  }
}
