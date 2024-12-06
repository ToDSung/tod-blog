import { atom } from 'jotai';

export const userAtom = atom({
  name: '',
  email: '',
});

export const userEmailAtom = atom(get => get(userAtom).email);
