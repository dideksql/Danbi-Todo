import React from 'react';

function Memo({ memoText, setMemoText }) {
  const handleChange = (e) => {
    setMemoText(e.target.value);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📝 메모</h2>
      <textarea
        value={memoText}
        onChange={handleChange}
        rows="5"
        placeholder="오늘의 메모를 입력하세요..."
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default Memo;