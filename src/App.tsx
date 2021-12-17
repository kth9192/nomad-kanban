import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import tw from 'twin.macro';
import { MenuIcon } from '@heroicons/react/solid';

const CardWrapper = tw.ul`flex flex-col p-2 bg-gray-200 rounded gap-2`;

const Card = tw.li`flex justify-between w-40 px-4 py-2 bg-white text-black`;

function App() {
  const onDragEnd = () => {};
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
                <Draggable draggableId="first" index={0}>
                  {(draggableProvide) => (
                    <Card
                      ref={draggableProvide.innerRef}
                      {...draggableProvide.draggableProps}
                    >
                      one{' '}
                      <span {...draggableProvide.dragHandleProps}>
                        <MenuIcon className="w-6 h-6" />
                      </span>
                    </Card>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(draggableProvide) => (
                    <Card
                      ref={draggableProvide.innerRef}
                      {...draggableProvide.draggableProps}
                    >
                      two{' '}
                      <span {...draggableProvide.dragHandleProps}>
                        <MenuIcon className="w-6 h-6" />
                      </span>
                    </Card>
                  )}
                </Draggable>
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
