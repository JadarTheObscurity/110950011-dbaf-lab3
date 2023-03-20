// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
	address owner;
	modifier onlyOwner {
		require( msg.sender == owner, "Only owner can call this function");
		_;
	}

    constructor(uint256 initialSupply) ERC20 ('Test Token', "TTN") {
		owner = msg.sender;
		_mint(owner, initialSupply)	;
    }

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	} 
}
