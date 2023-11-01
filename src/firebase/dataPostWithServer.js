import { collection, addDoc, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './config';

import date from 'date-and-time';

const dbRef = collection(db, 'posts');
const postRef = (postId) => doc(db, 'posts', postId);

const docRef = (postId) => collection(db, 'posts', postId, 'comments');

const listeners = [];
export const stopAllListeners = () => {
  listeners.forEach(async (unsubscribe) => {
    await unsubscribe();
  });
  listeners.length = 0; // Очистити масив слухачів
};

export const uploadPostToServer = async (postData) => {
  const addData = { ...postData, rating: 0, commentsCounter: 0 };
  try {
    await addDoc(dbRef, addData);
  } catch (error) {
    console.error('Помилка додавання документу: ', error);
  }
};

export const getAllPosts = async (setDataPosts) => {
  try {
    const unsubscribe = onSnapshot(dbRef, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }));
      setDataPosts(dataPosts.reverse());
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.error(error);
  }
};

export const getOwnPost = async (setDataPosts, userId) => {
  try {
    const ruleQuery = query(dbRef, where('userId', '==', userId));

    const unsubscribe = onSnapshot(ruleQuery, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
      setDataPosts(dataPosts.reverse());
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.error(error);
  }
};

export const getOnePost = async (setDataPost, postId) => {
  try {
    const unsubscribe = onSnapshot(dbRef, (querySnapshot) => {
      const findPost = querySnapshot.docs.find((doc) => doc.id === postId);
      setDataPost(findPost.data());
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.error(error);
  }
};

export const sendCommentToServer = async ({
  newComment,
  postId,
  userId,
  avatar,
  name,
  commentsCounter,
}) => {
  try {
    await updateDoc(postRef(postId), {
      commentsCounter: commentsCounter + 1,
    });

    const postDate = date.format(new Date(), 'D MMMM YYYY | HH:mm');

    await addDoc(docRef(postId), {
      text: newComment,
      postDate,
      own: userId,
      ownAvatar: avatar,
      ownName: name,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsForPost = async (setComments, postId) => {
  try {
    const unsubscribe = onSnapshot(docRef(postId), (querySnapshot) => {
      const dataComments = querySnapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }));

      setComments(dataComments);
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.error(error);
  }
};
