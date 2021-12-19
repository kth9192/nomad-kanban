import { Todo } from 'interface/todo';
import { atom } from 'recoil';

interface TodoState {
  [key: string]: Todo[];
}

export const todoState = atom<TodoState>({
  key: 'todo',
  default: {
    'to do': [],
    doing: [],
    done: [],
  },
});
