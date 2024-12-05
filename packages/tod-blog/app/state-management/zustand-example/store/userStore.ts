import { create } from 'zustand';

interface UserState {
  user: {
    name: string;
    email: string;
  };
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

const useUserStore = create<UserState>(set => ({
  user: {
    name: '',
    email: '',
  },
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
