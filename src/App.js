import './App.css';
import React, { useState, useEffect } from 'react';

import { getTodos, addTodoItem, removeTodoItem, updateTodoItem } from './services/todo';


import TodoItem from './components/TodoItem/TodoItem';
import TodoItemPopup from './components/TodoItemPopup/TodoItemPopup';


function TodoPagination({todos, RenderComponent, pages, dataLimit, toggleTodo, viewTodoItem, removeTodo}) {

  // let [pages] = useState(Math.ceil(todos.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  let pageLimit = pages <= 5 ? pages : 5;

  console.log(pages);

  const goToNextPage = () => {

    setCurrentPage((page) => page + 1);
    console.log(currentPage);

  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
    console.log(currentPage);
  };

  const changePage = (event) => {
    const pageNo = Number(event.target.textContent);
    setCurrentPage(pageNo);
  }

  const getPaginatedTodos = () => {

    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return todos.slice(startIndex, endIndex);

  }

  const getPaginatedGroup = () => {

    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((no, index) => start + index + 1);

  }

  return (
    <div>

      <div>
        { getPaginatedTodos().map((todo, index) => {
          return <RenderComponent key={index} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} viewTodoItem={viewTodoItem} />
        })}
      </div>

      <div className='pagination-items'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} >&lt;</button>

        {
          getPaginatedGroup().map((no, index) => {
            return <button key={index} onClick={changePage} >{no}</button>
          })
        }
        
        <button onClick={goToNextPage} disabled={currentPage === pages} >&gt;</button>
      </div>
    </div>
  );

}

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    let mounted = true;
    getTodos().then(data => {
      if(mounted) {
        setTodos(data['results'])
      }
    })
    return () => mounted = false;
  }, [])

  
  const [pages, setPages] = useState(1);


  const addTodo = text => {
    const todo = { title: text, completed: false };
    setTodos([...todos, todo]);
    addTodoItem(todo);
    todos.length === 0 ? setPages(1) : setPages(Math.ceil(todos.length / 5));
    setOpen(false);

  }

  const updateTodo = (text, id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id ===  id) {
        todo.title = text;
        updateTodoItem(todo, id);
      }
      return todo;
    });


    setTodos(updatedTodos);
    setOpen(false);
    setIsEdit(false);
  }

  const toggleTodo = id => {
    const updatedTodos = todos.map(todo => {
      if(id === todo.id) {
        const updatedTodo = {...todo, completed: !todo.completed};
        updateTodoItem(updatedTodo, id);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const removeTodo = id => {
    // refreshTodos();

    setTodos(todos.filter(todo => id !== todo.id));
    removeTodoItem(id);
    setPages(Math.round(todos.length / 5));
  }

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState({text: "", completed: false});


  const togglePopup = () => {
    setOpen(false);
    setIsEdit(false);
  }

  const viewTodoItem = (id) => {
    setOpen(true);
    setIsEdit(true);
    todos.map(todo => {
      if(todo.id === id) {
        setTodo(todo);
      }
      return todo;
    });

  }

 
  

  return (
    <div className="container">
      <button type='button' className='btn-add' onClick={() => setOpen(true)}>Add Todo</button>

      {todos.length > 0 ? (
        <>
          <TodoPagination todos={todos} RenderComponent={TodoItem} pages={pages} dataLimit={5} toggleTodo={toggleTodo} removeTodo={removeTodo} viewTodoItem={viewTodoItem} />
        </>
      ): <h1>No Todos</h1>}
      
      { open ? <TodoItemPopup togglePopup={togglePopup} addTodo={addTodo} isEdit={isEdit} todo={todo} updateTodo={updateTodo} /> : null}
    </div>
  );
}

export default App;
