import { createSlice } from '@reduxjs/toolkit';
import { authSighIn, authSighUp } from './authOperations';

const initialState = {
  user: { userId: null, name: null, email: null, avatar: null },
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: (builder) =>
    builder
      .addCase(authSighUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authSighUp.fulfilled, (state, action) => {
        const { displayName, email, uid, photoURL } = action.payload;
        state.user = { userId: uid, name: displayName, email, avatar: photoURL };
        state.isLoading = false;
      })
      .addCase(authSighUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(authSighIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authSighIn.fulfilled, (state, action) => {
        const { displayName, email, uid, photoURL } = action.payload;
        state.user = { userId: uid, name: displayName, email, avatar: photoURL };
        state.isLoading = false;
      })
      .addCase(authSighIn.rejected, (state) => {
        state.isLoading = false;
      }),
});
