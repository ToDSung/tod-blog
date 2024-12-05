import { combineReducers, configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterStore';
import userReducer from './userStore';

const baseStore = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    user: userReducer,
  }),
});

export type RootState = ReturnType<typeof baseStore.getState>;
export type AppDispatch = typeof baseStore.dispatch;

export default baseStore;
