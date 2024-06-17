import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List'
import { todo } from '../App';

type listsProps = {
  todoData: todo[],
  setTodoData: Function,
}

const Lists = ({ todoData, setTodoData }: listsProps) => {

  const handleEnd = (result: any) => {
    if (!result.destination) return;
    
    const newTodoData = todoData;
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todos'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Lists;