import React, { useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DraggableCard from 'components/draggableCard';
import tw from 'twin.macro';
import { Todo } from 'interface/todo';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { todoState } from 'shared/appStore';

interface IForm {
  todo: string;
}

interface BoardProps {
  toDos: Todo[];
  boardId: string;
}

function Board({ toDos, boardId }: BoardProps) {
  const [todos, setTodos] = useRecoilState(todoState);

  const { register, setValue, handleSubmit, resetField } = useForm<IForm>();

  const handleForm = ({ todo }: IForm) => {
    setTodos((prevState) => {
      return {
        ...prevState,
        [boardId]: [
          ...prevState[boardId],
          {
            id: new Date().toString(),
            content: todo,
          },
        ],
      };
    });
    console.log('test', boardId, todos);

    resetField('todo');
  };

  return (
    <BoardWrapper>
      <BoardTitle>{boardId}</BoardTitle>
      <Form onSubmit={handleSubmit(handleForm)}>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={`add task on ${boardId}`}
          {...register('todo', { required: true })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <CardWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${
              snapshot.isDraggingOver ? 'bg-gray-300' : 'bg-gray-200'
            }`}
          >
            {toDos.map((todo, idx) => (
              <DraggableCard key={idx} {...todo} idx={idx} />
            ))}
            {provided.placeholder}
          </CardWrapper>
        )}
      </Droppable>
    </BoardWrapper>
  );
}

const CardWrapper = tw.ul`w-full flex flex-col rounded gap-2 flex-grow items-center h-full transition ease-in-out delay-100 p-2`;

const BoardTitle = tw.h2`text-center font-bold capitalize mb-2 `;

const BoardWrapper = tw.div`flex flex-col w-full bg-gray-100 rounded py-2 gap-2`;

const Form = tw.form`w-full flex justify-center px-2`;

export default Board;
