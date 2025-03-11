import React, { useEffect, useState } from 'react';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
      // console.log(memos)
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h3 className="text-3xl font-bold text-center text-orange-600 mb-8">
        💬 Lovely Messages
      </h3>

      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
              <th className="border border-white px-6 py-3 text-center text-lg">
                Name
              </th>
              <th className="border border-white px-6 py-3 text-center text-lg">
                Timestamp
              </th>
              <th className="border border-white px-6 py-3 text-center text-lg">
                Message
              </th>
              <th className="border border-white px-6 py-3 text-center text-lg">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? 'bg-orange-50' : 'bg-white'
                } hover:bg-orange-100 transition duration-200 text-gray-700`}
              >
                <td className="border px-4 py-3 text-center font-semibold text-orange-600">
                  {memo.name === 'Tanishq Jaiswal' ? (
                    <span className="text-red-600 font-bold">{memo.name}</span>
                  ) : (
                    memo.name
                  )}
                </td>
                <td className="border px-4 py-3 text-center text-sm">
                  {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                </td>
                <td className="border px-4 py-3 text-center text-gray-700 max-w-xs break-words">
                  <span title={memo.message}>{memo.message}</span>
                </td>
                <td className="border px-4 py-3 text-center text-sm font-mono">
                  {memo.from}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Memos;
