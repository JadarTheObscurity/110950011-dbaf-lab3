pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Safe {

	mapping(address => mapping(address => uint256)) balance;
	// balance[userAddr][tokenAddr]

	function deposit(address token, uint256, amount) external  {
		IERC(token).transferFFrom(msg.sender, address(this), amount);
		balance[msg.sender][token] += amount;
		
	}
	function withdraw(address token, uint256, amount) external  {
		IERC(token).transfer(address(this), amount);
		balance[msg.sender][token] -= amount;
		
	}


}