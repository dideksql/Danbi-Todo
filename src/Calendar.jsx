import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar({ selectedDate, setSelectedDate, todosByDate, setTodosByDate }) {
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  // ✅ toLocaleDateString 사용하여 타임존 오차 제거
  const dateKey = selectedDate
    ? selectedDate.toLocaleDateString('sv-SE') // 'YYYY-MM-DD' 형식
    : '';

    //선택된거 날짜의 할 일 목록을 가져오는거. 없으면 빈 거.
  const todosForSelectedDate = todosByDate[dateKey] || [];

  //새로운 할 일 추가.
  const handleAddTodo = () => {
    const trimmed = newTodo.trim(); // 공백 제거
    if (!trimmed) return; // 비어있으면 추가 안하는 거.
    //새로운 할 일 객체 생성
    const newTodoItem = {
      id: Date.now(), 
      text: trimmed,
      isComplete: false, 
    };
    
    //기존 할 일 목록에 추가.
    const updatedTodos = {
      ...todosByDate, // 기존 전체 날싸 데이터 복사하는거.
      [dateKey]: [...todosForSelectedDate, newTodoItem], // 헤딩 닐찌의 할 일만 업데이트.
    };

    setTodosByDate(updatedTodos);
    setNewTodo('');
    setShowInput(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="my-6 text-left">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-gray-700">📅 날짜 선택:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 px-2 py-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🗓️ {dateKey}의 할 일</h3>

          <ul className="mb-4 space-y-1">
            {todosForSelectedDate.length === 0 ? (
            <li className="text-gray-500">할 일이 없습니다.</li>
             ) : (
             todosForSelectedDate.map((todo) => (
             <li
            key={todo.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
            // 토글 함수 호출
            const updatedTodos = todosForSelectedDate.map(t =>
            t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t
            );
             setTodosByDate(prev => ({
                ...prev,
                [dateKey]: updatedTodos
            }));
         }}
             >
            <span>{todo.isComplete ? '✅' : '⬜'}</span>
            <span className={todo.isComplete ? 'line-through text-gray-400' : ''}>
            {todo.text}
             </span>
            </li>
                ))
                )}
            </ul>


          <button
            onClick={() => setShowInput(!showInput)}
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showInput ? '입력 취소' : '할 일 추가하기'}
          </button>

          {showInput && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="할 일을 입력하세요"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleAddTodo}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                추가
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;

