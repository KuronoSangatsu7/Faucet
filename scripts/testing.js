const { web3 } = require("hardhat");

async function main() {
  const faucetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const faucetAbi = [
    {
      "inputs": [],
      "name": "addFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllFunders",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getFunderAtIndex",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numOfFunders",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "withdrawAmount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

  const faucetContract = await new web3.eth.Contract(faucetAbi, faucetAddress);

  const num = await faucetContract.methods.numOfFunders().call()
  .then(console.log);

  await faucetContract.methods.addFunds().send({from:'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', value:1000000000000000000})
  .then(console.log)

  const num1 = await faucetContract.methods.numOfFunders().call()
  .then(console.log);

  const contractBalance = await web3.eth.getBalance(faucetContract.options.address)
  .then(console.log);

  const funders = await faucetContract.methods.getAllFunders().call()
  .then(console.log);

}

main()
.then(() => process.exit(0))
.catch((e) => {
  console.log(e);
  process.exit(1);
})
