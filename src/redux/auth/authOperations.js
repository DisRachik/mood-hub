import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

export const authSighUp = createAsyncThunk(
  'auth/signUp',
  async ({ mail, password, login, userPhoto }, thunkAPI) => {
    // console.log('userPhoto', userPhoto);
    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: userPhoto,
      });
      const { displayName, uid, photoURL, email } = auth.currentUser;

      return { displayName, uid, photoURL, email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSighIn = createAsyncThunk('auth/signIn', async ({ mail, password }, thunkAPI) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, mail, password);
    const { displayName, email, uid, photoURL } = user;

    return { displayName, email, uid, photoURL };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authSighOut = createAsyncThunk('auth/SignOut', async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            const { displayName, uid, photoURL, email } = user;
            resolve({ displayName, uid, photoURL, email });
          } else {
            resolve({ displayName: null, uid: null, photoURL: null, email: null });
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
