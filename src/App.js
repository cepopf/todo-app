import React, { useState, useEffect } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [allTodos, setallTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    let updatedTodos = [...allTodos];
    updatedTodos.push(newTodoItem);
    setallTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setallTodos(reduceTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hour = now.getHours();
    let min = now.getMinutes();
    let second = now.getSeconds();
    let completedOn = `${yyyy}-${mm}-${dd} ${hour}:${min}:${second}`;

    let filterItem = {
      ...allTodos[index],
      completedOn: completedOn,
    }
    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.push(filterItem);
    setCompletedTodos(updatedCompletedTodos);

    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);

    setallTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  }

  const handleDeleteCompletedTodo = (index) =>{
  let reducedCompletedTodos = [...completedTodos];
  reducedCompletedTodos.splice(index,1);

  setCompletedTodos(reducedCompletedTodos);
  localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodos));
}


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setallTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);



  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What is the task title?" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What is the task description?" />
          </div>
          <button type='button' onClick={handleAddTodo} className='add-btn'>Add</button>
        </div>
        <div className='btn-area'>
          <button className={`btn-todo ${isComplete === false && 'active'}`} onClick={() => setIsComplete(false)}>
            Todo</button>
          <button className={`btn-complete ${isComplete === true && 'active'}`} onClick={() => setIsComplete(true)}>
            Complete</button>
        </div>
        <div className='todo-list'>
          {isComplete === false && allTodos.map((item, index) => {
            return (
              <div className='todo-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
                  <FaCheck className='check-icon' onClick={() => handleComplete(index)} title='Complete' />
                </div>
              </div>
            )
          })}


          {isComplete === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Delete' />
                </div>
              </div>
            )
          })}

        </div>

      </div>
    </div>
  );
}

export default App;
