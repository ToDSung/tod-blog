import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    name: string;
    email: string;
  };
}

const initialState: UserState = { user: { name: '', email: '' } };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: { payload: { name: string } }) => {
      state.user.name = action.payload.name;
    },
    setEmail: (state, action: { payload: { email: string } }) => {
      state.user.email = action.payload.email;
    },
  },
});

export const { setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
