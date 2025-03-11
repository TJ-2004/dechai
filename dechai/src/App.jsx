import React, { useEffect, useState } from 'react';
import abi from './contractJson/chai.json';
import { ethers } from 'ethers';
import Buy from './components/Buy.jsx';
import Memos from './components/Memos.jsx';

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contractAddress = contractAddress; // Replace if redeployed
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);

      setState({ provider, signer, contract });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkWalletConnected = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          setLoading(false);
          return;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
          const contract = new ethers.Contract(
            contractAddress,
            abi.abi,
            signer,
          );

          setState({ provider, signer, contract });
        }

        ethereum.on('accountsChanged', () => window.location.reload());

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    checkWalletConnected();
  }, []);

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Tanishq Jaiswal
      </h1>

      {loading ? (
        <p className="mt-6 text-gray-500">Checking wallet...</p>
      ) : !account ? (
        <button
          onClick={connectWallet}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
            alt="MetaMask"
            className="w-6 h-6"
          />
          Connect MetaMask
        </button>
      ) : (
        <p className="mt-4 text-sm text-gray-600 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg inline-block shadow-sm">
          <span className="font-medium text-gray-800">Connected Account:</span>{' '}
          <span className="font-mono text-blue-600 break-all">{account}</span>
        </p>
      )}

      <Buy state={state} isWalletConnected={!!account} />

      {account && state.signer ? (
        <Memos state={state} />
      ) : (
        <p className="mt-6 text-gray-400 italic">
          Connect wallet to view memos.
        </p>
      )}
    </div>
  );
};

export default App;
