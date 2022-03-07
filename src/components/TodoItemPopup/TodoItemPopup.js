
import React, { useState } from 'react';

import TodoForm from '../TodoForm/TodoForm';

export default function TodoItemPopup({ togglePopup, addTodo, isEdit, todo, updateTodo }) {

  

    const handleClick = () => {
      
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>
              { isEdit ? "Edit Todo Item" : "Add Todo Item" }
              
            </h3>
            <span className="modal-close" onClick={togglePopup}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <TodoForm addTodo={addTodo} todo={todo} isEdit={isEdit} updateTodo={updateTodo} />
          </div>
        </div>
      </div>
    );
  
  }