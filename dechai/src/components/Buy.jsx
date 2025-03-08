import React, { useState } from "react";
import { ethers } from "ethers";
const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const buyChai = async (e) => {
    e.preventDefault();
    const { contract } = state;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }
    const finalAmount = { value: ethers.parseEther(amount.toString()) };
    const transaction = await contract.buyChai(name, message, finalAmount);
    await transaction.wait();
    alert("Transaction is successfull");
    window.location.reload();
    console.log(name, message);
  };
  return (
    <form onSubmit={buyChai}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        placeholder="Name"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="message"
        placeholder="Message"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        id="amount"
        placeholder="Amount: 0.001 ETH"
      />
      <button>Pay for my chai!!</button>
    </form>
  );
};

export default Buy;
