// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MintNFTContract is ERC721 {
    struct NFT {
        uint  movie_id;
        string movie_title;
        string movie_image_uri;
        address addressId;
    }

    uint256 public mintPrice = 0 ether;

    uint256 public totalSupply;

    uint256 public maxSupply;

    NFT[] public nfts;


    function getNFTList() public view returns (NFT[] memory) {
        return nfts;
    }

    constructor() payable ERC721('NFT', 'MINTNFT') {
        maxSupply = 1000;
    }


    function mint(uint256 id,string memory title,string memory uri) external payable {

        require(msg.value == mintPrice, 'wrong value');

        require(maxSupply > totalSupply, 'sold out');

        totalSupply++;

        uint256 tokenId = totalSupply;

        nfts.push( NFT(id,title,uri,msg.sender));

        _safeMint(msg.sender, tokenId);
    }
}