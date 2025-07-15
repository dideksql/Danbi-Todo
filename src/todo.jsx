import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './todoList';
import Filter from './Filter';
import Calendar from './Calendar';

function Todo() {
  const [todosByDate, setTodosByDate] = useState({
    'yyyy-MM-dd': [
      { id: 0, text: '공부하기', isComplete: false },
      { id: 1, text: '운동하기', isComplete: true },
      { id: 2, text: '청소하기', isComplete: false }
    ]
  });

  const [filter, setFilter] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateKey = selectedDate.toISOString().split('T')[0];
  const todoList = todosByDate[dateKey] || [];

  const setTodoListForSelectedDate = (newList) => {
    setTodosByDate(prev => ({
      ...prev,
      [dateKey]: newList,
    }));
  };
  

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
    </div>
  );
}

export default Todo;
