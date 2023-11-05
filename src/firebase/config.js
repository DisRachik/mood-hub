import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAeGML4H6yEhT1OlRCdbEjsDKMQgp4Qozk',
  authDomain: 'mood-hub-6b6f5.firebaseapp.com',
  databaseURL: 'https://mood-hub-6b6f5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mood-hub-6b6f5',
  storageBucket: 'mood-hub-6b6f5.appspot.com',
  messagingSenderId: '1057051606086',
  appId: '1:1057051606086:web:d14535b58b6cbc0adf1e47',
  measurementId: 'G-K5PW4XHNT8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
