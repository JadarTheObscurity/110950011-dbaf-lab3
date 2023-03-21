// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lab3 {
    mapping(address => mapping(address => uint256)) _balance;

    function withdraw(address token, uint256 amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        console.log("In withdraw");
        console.log("Balance: ", _balance[msg.sender]);
        console.log("Withdraw: ", amount);
        require(_balance[msg.sender] >= amount, "You don't have enough balance.");
        IERC20(token).transfer(msg.sender, amount);
        _balance[msg.sender][token] -= amount;

    }

    function deposit(address token, uint256 amount) public {
        require(IERC20(token).allowance(msg.sender, address(this)) >= amount, "Please allow more.");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        _balance[msg.sender][token] += amount;
    }

    function balanceOf(address _owner) public view returns(uint256 Calldata){
        return _balance[_owner];
    }
}
