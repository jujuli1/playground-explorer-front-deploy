import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginPayload {
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  logged: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  favoritePlaygrounds: number[];
}

const loadInitialState = (): UserState => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    logged: !!accessToken && !!refreshToken,
    accessToken,
    refreshToken,
    favoritePlaygrounds: [],
  };
};

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logged = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.logged = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setPlaygroundsFavorite(state, action: PayloadAction<number[]>) {
      state.favoritePlaygrounds = action.payload;
    },
  },
});

export const { login, logout, setPlaygroundsFavorite } = userSlice.actions;
export default userSlice.reducer;
