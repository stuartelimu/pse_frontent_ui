import React from 'react';
import './TodoItem.css';

export default function TodoItem({ todo, toggleTodo, removeTodo, viewTodoItem }) {

    const completedStyle = {
        fontSyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
      }

    

    return (
      <div className='todo-item'>
        <input type="checkbox" className='checkbox-toggle' checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
        <label style={todo.completed ? completedStyle : null} onClick={() => viewTodoItem(todo.id)}>{todo.title}</label>
        <button className='btn-delete' type="button" onClick={() => removeTodo(todo.id)}>X</button>
        
      </div>
  
    )
  }
