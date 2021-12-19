import { MenuIcon } from '@heroicons/react/solid';
import { Todo } from 'interface/todo';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import tw from 'twin.macro';

interface DraggableCardProps extends Todo {
  idx: number;
}

const Card = tw.li`flex justify-between w-40 px-4 py-2  text-black`;

function DraggableCard({ id, content, idx }: DraggableCardProps) {
  return (
    <Draggable key={id} draggableId={id} index={idx}>
      {(draggableProvide, snapshot) => (
        <Card
          className={`${
            snapshot.isDragging ? 'bg-indigo-300 shadow-lg' : 'bg-white'
          }`}
          ref={draggableProvide.innerRef}
          {...draggableProvide.draggableProps}
        >
          {content}
          <span {...draggableProvide.dragHandleProps}>
            <MenuIcon className="w-6 h-6" />
          </span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
