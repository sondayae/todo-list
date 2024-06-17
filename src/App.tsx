import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';

export type todo = {
  id: string,
  title: string,
  completed: boolean,
};

const initialValue = localStorage.getItem('todoData');
const initialTodoData = initialValue ? JSON.parse(initialValue) : [];


function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('핸들 섭밋');
    
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev: todo[]) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

    setValue('');
  }

  const handleRemove = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full p-6 m-4 rounded-md shadow-md md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg bg-white">
        <div className='flex justify-between'>
          <h1 className="mb-4">할 일 목록</h1>
          <button onClick={handleRemove}>모두 지우기</button>
        </div>
        <div>
          <Lists todoData={todoData} setTodoData={setTodoData} />
          <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default App;
