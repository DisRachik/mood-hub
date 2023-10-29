import { createSlice } from '@reduxjs/toolkit';
import { authSighIn, authSighOut, authSighUp, checkAuth } from './authOperations';

const initialState = {
  user: { userId: null, name: null, email: null, avatar: null },
  isLoading: false,
  isRefreshing: false,
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
      })
      .addCase(authSighOut.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { displayName, email, uid, photoURL } = action.payload;
        state.user = { userId: uid, name: displayName, email, avatar: photoURL };
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
      }),
});
