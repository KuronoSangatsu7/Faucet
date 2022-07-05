//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}