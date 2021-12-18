import { atom, selector } from 'recoil';

export const todoState = atom({
  key: 'minute',
  default: [
    { id: 0, name: 'a' },
    { id: 1, name: 'b' },
    { id: 2, name: 'c' },
    { id: 3, name: 'd' },
    { id: 4, name: 'e' },
  ],
});
