import { collection, addDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from './config';

export const uploadPostToServer = async (postData) => {
  const addData = { ...postData, rating: 0, comment: [] };
  try {
    await addDoc(collection(db, 'posts'), addData);
  } catch (error) {
    console.error('Помилка додавання документу: ', error);
  }
};

export const getAllPosts = async (setDataPosts) => {
  try {
    onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
      setDataPosts(dataPosts.reverse());
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOwnPost = async (setDataPosts, userId) => {
  try {
    const ruleQuery = query(collection(db, 'posts'), where('userId', '==', userId));

    onSnapshot(ruleQuery, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
      setDataPosts(dataPosts.reverse());
    });
  } catch (error) {
    console.error(error);
  }
};
