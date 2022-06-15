import './App.css';
import {useEffect, useState} from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import abi from './utils/Faucet.json';

function App() {

  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null
  });

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(null);

  const reloadEffect = () => reload(!shouldReload);

  useEffect(() =>
  {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const faucetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const faucetAbi = abi.abi;
      const tempWeb3 = new Web3(provider);
      const contract = await new tempWeb3.eth.Contract(faucetAbi, faucetAddress);

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        });
      }
    }

    loadProvider();
  }, [])

  useEffect(() => {
    const loadBalance = async () => {
      const {contract, web3} = web3Api;
      let balance = await web3.eth.getBalance(contract.options.address);
      balance = web3Api.web3.utils.fromWei(balance);
      setBalance(balance);
    }

    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts(); 
      setAccount(accounts[0]);
    }

    web3Api.provider && web3Api.provider.on("accountsChanged", getAccount)

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const enableEth = async () => {
    web3Api.provider.request({method: "eth_requestAccounts"})
  };

  const sendFunds = async () => {
    const sendTx = await web3Api.contract.methods.addFunds().send({
      from: account,
      value: '1000000000000000000'
    }).then(console.log);

    reloadEffect();
  };

  const withdrawFunds = async () => {
    const withdrawTx = await web3Api.contract.methods.withdraw(web3Api.web3.utils.toWei('0.1')).send({
      from: account,
    }).then(console.log);

    reloadEffect();
  }

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
        <div className="is-flex">
            <span>
              <strong className="mr-2 is-align-items-center">Account: </strong>
            </span>
              { account ? 
              <div>{account}</div> :
              !web3Api.provider ? 
              <>
                <div className="notification is-warning is-size-6 is-rounded">
                  Wallet not detected!{` `}
                  <a className="is-block" target="_blank" href="https://docs.metamask.io">
                    Install MetaMask
                  </a>
                </div>
              </> :
              <button
                className="button is-small"
                onClick={enableEth}
              >
                Connect MetaMask
              </button>
              }
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button
            disabled={!account}
            className="button is-link mr-2"
            onClick={sendFunds}
          >
            Donate 1 ETH</button>
          <button
            disabled={!account}
            className="button is-primary"
            onClick={withdrawFunds}
          >
              Withdraw 0.1 ETH</button>
        </div>
      </div>
    </>
  );
}

export default App;
