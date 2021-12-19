import Board from 'components/board';
import DraggableCard from 'components/draggableCard';
import { Todo } from 'interface/todo';
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from 'shared/appStore';
import tw from 'twin.macro';
import './App.css';

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setTodos((prevState) => {
        const sourceBoard = [...prevState[source.droppableId]];

        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(
          destination.index,
          0,
          prevState[source.droppableId].find(
            (item) => item.id === draggableId,
          ) ?? ({} as Todo),
        );

        return { ...prevState, [source.droppableId]: sourceBoard };
      });
    } else {
      setTodos((prevState) => {
        const sourceBoard = [...prevState[source.droppableId]];
        const destinationBoard = [...prevState[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(
          destination.index,
          0,
          prevState[source.droppableId].find(
            (item) => item.id === draggableId,
          ) ?? ({} as Todo),
        );

        return {
          ...prevState,
          [destination.droppableId]: destinationBoard,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };

  return (
    <div className="w-full flex flex-1 bg-blue-400 dark:bg-indigo-900">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-1/3 h-4/5 m-auto justify-center items-center gap-4">
          {Object.keys(todos).map((boardId) => (
            <Board toDos={todos[boardId]} boardId={boardId} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
