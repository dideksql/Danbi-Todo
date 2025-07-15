import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './todoList';
import Filter from './Filter';
import Calendar from './Calendar';
import Memo from './Memo'; // 추가된 부분

function Todo() {
  const [todosByDate, setTodosByDate] = useState({
    'yyyy-MM-dd': [
      { id: 0, text: '공부하기', isComplete: false },
      { id: 1, text: '운동하기', isComplete: true },
      { id: 2, text: '청소하기', isComplete: false }
    ]
  });

  const [memosByDate, setMemosByDate] = useState({}); // 🔸 메모 저장용 상태
  const [filter, setFilter] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateKey = selectedDate.toISOString().split('T')[0];
  const todoList = todosByDate[dateKey] || [];
  const memoText = memosByDate[dateKey] || '';

  const setTodoListForSelectedDate = (newList) => {
    setTodosByDate(prev => ({
      ...prev,
      [dateKey]: newList,
    }));
  };

  const setMemoTextForSelectedDate = (newMemo) => {
    setMemosByDate(prev => ({
      ...prev,
      [dateKey]: newMemo,
    }));
  };

    useEffect(() => {
    localStorage.setItem('todosByDate', JSON.stringify(todosByDate));
    }, [todosByDate]);

  // ✅ 불러오기
    useEffect(() => {
    const saved = localStorage.getItem('todosByDate');
    if (saved) {
      setTodosByDate(JSON.parse(saved));
    }
    }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>📝 My Todo App</h1>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        todosByDate={todosByDate}
        setTodosByDate={setTodosByDate}
      />
      <TodoInput todoList={todoList} setTodoList={setTodoListForSelectedDate} />
      <Filter onChange={setFilter} />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoListForSelectedDate}
        filter={filter}
      />
      <Memo memoText={memoText} setMemoText={setMemoTextForSelectedDate} />
    </div>
  );
}

export default Todo;