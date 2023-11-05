import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authSighIn, authSighOut, authSighUp, checkAuth, updateUserFoto } from './authOperations';

const initialState = {
  user: { userId: null, name: null, email: null, avatar: null },
  isLoading: false,
  isUpdateComponent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: (builder) =>
    builder
      .addCase(authSighOut.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addCase(updateUserFoto.pending, (state) => {
        state.isUpdateComponent = true;
      })
      .addCase(updateUserFoto.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.isUpdateComponent = false;
      })
      .addCase(updateUserFoto.rejected, (state) => {
        state.isUpdateComponent = false;
      })
      .addMatcher(isAnyOf(authSighUp.pending, authSighIn.pending, checkAuth.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(authSighUp.fulfilled, authSighIn.fulfilled, checkAuth.fulfilled),
        (state, action) => {
          const { displayName, email, uid, photoURL } = action.payload;
          state.user = { userId: uid, name: displayName, email, avatar: photoURL };
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(authSighUp.rejected, authSighIn.rejected, checkAuth.rejected),
        (state) => {
          state.isLoading = false;
        }
      ),
});
