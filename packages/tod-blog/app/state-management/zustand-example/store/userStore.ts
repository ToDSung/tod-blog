import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';

interface UserState {
  user: {
    name: string;
    email: string;
  };
}

interface UserAction {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

export type UserStore = UserState & UserAction;

const initialState: UserState = {
  user: {
    name: '',
    email: '',
  },
};

export const createUserStore = () => {
  return createStore<UserStore>()(set => ({
    ...initialState,
    setName: (name: string) =>
      set(state => ({
        user: { ...state.user, name },
      })),
    setEmail: (email: string) =>
      set(state => ({
        user: { ...state.user, email },
      })),
  }));
};

const useUserStore = create<UserStore>(set => ({
  ...initialState,
  setName: (name: string) =>
    set(state => ({
      user: { ...state.user, name },
    })),
  setEmail: (email: string) =>
    set(state => ({
      user: { ...state.user, email },
    })),
}));

export default useUserStore;
