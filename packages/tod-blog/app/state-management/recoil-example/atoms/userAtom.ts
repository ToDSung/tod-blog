import { atom, selector } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    name: '',
    email: '',
  },
});

export const userEmailAtom = selector({
  key: 'userEmailAtom',
  get: ({ get }) => get(userAtom).email,
});
