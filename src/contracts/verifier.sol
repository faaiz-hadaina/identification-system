// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Verifier{
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal projectOwnerAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;

    struct Product{
        address payable owner;
        string productName;
        string summary;
        string productImage;
        uint good;
        uint bad;
    }

    uint productLength = 0;
    mapping (uint => Product) internal products;


    function addProduct(
        string memory _name,
        string memory _summary,
        string memory _image

    )public payable{
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                projectOwnerAddress,
                3000000000000000000
            ),
            "Transaction can not be performed"
        );
        products[productLength] = Product(
            payable(msg.sender),
            _name,
            _summary,
            _image,
            0,
            0
        );
        productLength++;
    }

    function getProducts(uint _index) public view returns(
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        uint
    ){
        Product storage product  = products[_index];
        return (
            product.owner,
            product.productName,
            product.summary,
            product.productImage,
            product.good,
            product.bad
        );
    }

    function upvoteProduct(uint index) public payable {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                projectOwnerAddress,
                1000000000000000000
            ),
            "Transaction can not be performed"
        );
        products[index].good++;
    }

    function downvoteProduct(uint index) public payable {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                projectOwnerAddress,
                1000000000000000000
            ),
            "Transaction can not be performed"
        );
        products[index].bad++;
    }
    function getProductLength() public view returns (uint) {
        return (productLength);
    }


}