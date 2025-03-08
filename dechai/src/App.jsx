import React, { useEffect, useState } from "react";
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Buy from "./components/Buy.jsx";
import Memos from "./components/Memos.jsx";
import chai from "./chai.png";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not Connected to Metamask");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x73B9618C1e3D851107c5D75e844CDc95e799e99e";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          alert("MetaMask not detected!");
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(accounts);
        const provider = new ethers.BrowserProvider(ethereum); // v6
        const signer = await provider.getSigner(); // v6 requires await
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.error(error);
      }
    };
    template();
  }, []);

  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
};

export default App;
