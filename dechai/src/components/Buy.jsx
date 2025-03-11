import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Buy = ({ state }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const buyChai = async (e) => {
    e.preventDefault();
    const { contract } = state;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    try {
      setLoading(true);
      const finalAmount = { value: ethers.parseEther(amount.toString()) };
      const transaction = await contract.buyChai(name, message, finalAmount);
      await transaction.wait();
      setName('');
      setMessage('');
      setAmount('');
      toast.success('Transaction successfull!');
      setTimeout(() => {
        window.location.reload();
      }, 5000); // 3 seconds delay
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="max-w-md mx-auto mt-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl space-y-5 border border-gray-200"
        onSubmit={buyChai}
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 tracking-wide">
          Buy Me a Chai ☕
        </h2>

        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Your Name"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 bg-gray-50 placeholder-gray-400 shadow-sm"
        />

        <input
          type="text"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          placeholder="Leave a message"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 bg-gray-50 placeholder-gray-400 shadow-sm"
        />

        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          id="amount"
          placeholder="Amount: 0.001 ETH"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 bg-gray-50 placeholder-gray-400 shadow-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-lg text-white shadow-md transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600'
          }`}
        >
          {loading ? 'Processing Transaction...' : 'Pay for my chai!!'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Buy;
