import React, { ReactEventHandler, useState } from 'react'
import { todo } from '../App';

type todoProps = {
    id: string,
    title: string,
    completed: boolean,
    todoData: todo[],
    setTodoData: Function,
    provided: any,
    snapshot: any,
}

const List = ({id, title, completed, todoData, setTodoData, provided, snapshot}: todoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    
    const handleClick = (id: string) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };
    const handleCompleteChange = (id: string) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    }
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(e.target.value);
    }
    const handleSubmit = () => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
        return (
          <div className="flex justify-between px-3 py-2 bg-blue-100 border rounded-md mb-2">
            <form>
              <input type='text' defaultValue={title} onChange={handleEditChange}/>
            </form>
            <div>
              <button className="mr-4" onClick={handleSubmit}>저장</button>
              <button onClick={() => setIsEditing(false)}>취소</button>
            </div>
          </div>
        );
    } else {
        return (
          <div
            key={id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${snapshot.isDraggin ? 'bg-gray-400' : 'bg-gray-100'} flex justify-between px-3 py-2 bg-blue-100 border rounded-md mb-2`}
          >
            <div>
              <input type="checkbox" className='mr-4' defaultChecked={completed} onChange={() => handleCompleteChange(id)}/>
              <span className={`${completed ? 'line-through' : undefined}`}>{title}</span>
            </div>
            <div>
              <button className='mr-4' onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={() => handleClick(id)}>삭제</button>
            </div>
          </div>
        );
    }
};

export default List