import './App.css';
import React from 'react';
import Todo from './todo';

function TodoApp() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <Todo />
      </div>
    </div>
  );
}

export default TodoApp;