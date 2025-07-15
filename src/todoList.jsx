import React, { useState } from 'react';

function TodoList({ todoList = [], setTodoList, filter = 0 }) {
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleDelete = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditInput(text);
  };

  const handleSave = () => {
    setTodoList(todoList.map(todo =>
      todo.id === editingId ? { ...todo, text: editInput } : todo
    ));
    setEditingId(null);
    setEditInput('');
  };

  const handleToggleComplete = (id) => {
    console.log('toggleComplete id:', id);
    const updated = todoList.map(todo =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodoList(updated);
  };

  const filtered = todoList.filter(todo => {
    if (filter === 1) return !todo.isComplete;
    if (filter === 2) return todo.isComplete;
    return true;
  });

  return (
    <div>
      <h2>📋 Todo List</h2>
      <ul>
        {filtered.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleToggleComplete(todo.id)}
              style={{ marginRight: '8px' }}
            />
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                  style={{ flex: 1, marginRight: '8px' }}
                />
                <button onClick={handleSave}>✅</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </>
            ) : (
              <>
                <span style={{
                  flex: 1,
                  textDecoration: todo.isComplete ? 'line-through' : 'none',
                  color: todo.isComplete ? 'gray' : 'black'
                }}>
                  {todo.text}
                </span>
                <button onClick={() => handleDelete(todo.id)}>🗑️</button>
                <button onClick={() => handleEdit(todo.id, todo.text)}>✏️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
