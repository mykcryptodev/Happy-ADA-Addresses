pragma solidity ^0.6.12;
// SPDX-License-Identifier: Unlicensed

import "./HappyCoin.sol";

contract SendHappy {
  string public name = "Send Happy";
  HappyCoin public happy;
  address teamWallet = 0xdD6d8d097cb27417534E0E584BeD7726C7Dd8FBd;

  event HappySent(
    address account,
    address happy,
    address teamWallet,
    uint256 amount
  );

  constructor(HappyCoin _happy) public {
    happy = _happy;
  }

  function sendHappy (uint256 _amount) public {
    // User can't send more tokens than they have
    require(happy.balanceOf(msg.sender) >= _amount);
    // Send happy to the happy team
    happy.transferFrom(msg.sender, teamWallet, _amount);
    // Emit an event
    emit HappySent(msg.sender, address(happy), teamWallet, _amount);
  }

  // function updateTeamWalletAddress(address _account) public onlyOwner() {
  //   teamWallet = _account;
  // }
}