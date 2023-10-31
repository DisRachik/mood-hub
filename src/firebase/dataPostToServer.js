import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

export const uploadPostToServer = async (postData) => {
  const addData = { ...postData, rating: 0, comment: [] };
  try {
    const setNewPost = await addDoc(collection(db, 'posts'), addData);
    // console.log('setNewPost', setNewPost);
  } catch (error) {
    console.error('Помилка додавання документу: ', error);
  }
};
