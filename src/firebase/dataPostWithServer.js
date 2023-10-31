import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from './config';

import date from 'date-and-time';

const dbRef = collection(db, 'posts');
const postRef = (postId) => doc(db, 'posts', postId);

const docRef = (postId) => collection(db, 'posts', postId, 'comments');

export const uploadPostToServer = async (postData) => {
  const addData = { ...postData, rating: 0, comments: 0 };
  try {
    await addDoc(dbRef, addData);
  } catch (error) {
    console.error('Помилка додавання документу: ', error);
  }
};

export const getAllPosts = async (setDataPosts) => {
  try {
    onSnapshot(dbRef, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }));

      setDataPosts(dataPosts.reverse());
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOwnPost = async (setDataPosts, userId) => {
  try {
    const ruleQuery = query(dbRef, where('userId', '==', userId));

    onSnapshot(ruleQuery, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
      setDataPosts(dataPosts.reverse());
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOnePost = async (setDataPost, postId) => {
  try {
    onSnapshot(dbRef, (querySnapshot) => {
      const findPost = querySnapshot.docs.find((doc) => doc.id === postId);
      setDataPost(findPost.data());
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendCommentToServer = async ({ newComment, postId, userId, commentsCounter }) => {
  try {
    await updateDoc(postRef(postId), {
      commentsCounter: commentsCounter + 1,
    });

    const postDate = date.format(new Date(), 'D MMMM YYYY | HH:mm');

    await addDoc(docRef(postId), {
      text: newComment,
      postDate,
      own: userId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsForPost = async (setComments, postId) => {
  try {
    onSnapshot(docRef(postId), (querySnapshot) => {
      const dataComments = querySnapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }));

      // console.log('dataComments', dataComments);
      setComments(dataComments);
    });
  } catch (error) {
    console.error(error);
  }
};
