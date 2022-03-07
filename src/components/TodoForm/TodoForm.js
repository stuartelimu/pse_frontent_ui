import React, { useState } from 'react';
import './TodoForm.css';


export default function TodoForm({ addTodo, isEdit, updateTodo, todo }) {

    const [value, setValue] = useState(isEdit === true ? todo.title : "" );
  
    const handleChange = e => {
      setValue(e.target.value);
    }
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      isEdit === true ? updateTodo(value, todo.id) : addTodo(value);
      setValue("");
  
    }
  
    return (
      <form onSubmit={handleSubmit} >
        <input className='todo-input' autoFocus type="text" value={value} autoComplete="off" onChange={handleChange} />
      </form>
    )
  
  }