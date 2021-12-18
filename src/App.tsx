import DraggableCard from 'components/draggableCard';
import { Todo } from 'interface/todo';
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from 'shared/appStore';
import tw from 'twin.macro';
import './App.css';

const CardWrapper = tw.ul`flex flex-col p-2 bg-gray-200 rounded gap-2`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    destination &&
      setTodos((prevState) => {
        const copy = [...prevState];
        copy.splice(source.index, 1);
        copy.splice(
          destination?.index,
          0,
          prevState.find((todo) => todo.name === draggableId) ?? ({} as Todo),
        );
        return copy;
      });
  };
  return (
    <div className="w-full flex flex-1 bg-blue-400 dark:bg-indigo-900">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-1/3 h-4/5 m-auto justify-center items-center">
          <Droppable droppableId="one">
            {(droppableProvide) => (
              <CardWrapper
                ref={droppableProvide.innerRef}
                {...droppableProvide.droppableProps}
              >
                {todos.map((todo, idx) => (
                  <DraggableCard key={idx} {...todo} idx={idx} />
                ))}
                {droppableProvide.placeholder}
              </CardWrapper>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
