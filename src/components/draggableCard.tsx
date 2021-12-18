import { MenuIcon } from '@heroicons/react/solid';
import { Todo } from 'interface/todo';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import tw from 'twin.macro';

interface DraggableCardProps extends Todo {
  idx: number;
}

const Card = tw.li`flex justify-between w-40 px-4 py-2 bg-white text-black`;

function DraggableCard({ id, name, idx }: DraggableCardProps) {
  return (
    <Draggable key={id} draggableId={name} index={idx}>
      {(draggableProvide) => (
        <Card
          ref={draggableProvide.innerRef}
          {...draggableProvide.draggableProps}
        >
          {name}
          <span {...draggableProvide.dragHandleProps}>
            <MenuIcon className="w-6 h-6" />
          </span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
