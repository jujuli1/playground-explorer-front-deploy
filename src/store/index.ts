import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import searchReducer from './slice/searchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
