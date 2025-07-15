// components/TodoInput.js
import React, { useState } from 'react';

function TodoInput({ todoList, setTodoList }) {
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    const trimmed = input.trim();
    if (trimmed === '') return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      isComplete: false,
      selected: false // 선택 기능이 있다면 기본 false
    };

    setTodoList([...todoList, newTodo]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleKeyDown}
        placeholder="할 일을 입력하세요"
        className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        등록
      </button>
    </div>
  );
}

export default TodoInput;
