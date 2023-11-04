import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

import date from 'date-and-time';

const dbRef = collection(db, 'posts');
const postRef = (postId) => doc(db, 'posts', postId);
const commentsRef = (postId) => collection(db, 'posts', postId, 'comments');

const listeners = [];
export const stopAllListeners = () => {
  listeners.forEach(async (unsubscribe) => {
    await unsubscribe();
  });
  listeners.length = 0; // Очистити масив слухачів
};

export const uploadPostToServer = async (postData) => {
  const addData = { ...postData, rating: 0, commentsCounter: 0, currentLikes: [] };
  try {
    await addDoc(dbRef, addData);
  } catch (error) {
    console.log('Помилка додавання документу: ', error);
  }
};

export const getAllPosts = async (setDataPosts) => {
  try {
    const unsubscribe = onSnapshot(dbRef, (querySnapshot) => {
      const dataPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
        // isLiked,
      }));
      setDataPosts(dataPosts.reverse());
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const getOnePost = async (setDataPost, postId) => {
  try {
    const postSnapshot = await getDoc(postRef(postId));

    setDataPost(postSnapshot.data());
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  await deleteDoc(postRef(postId));
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
    const post = await postRef(postId);

    await updateDoc(postRef(postId), {
      commentsCounter: commentsCounter + 1,
    });

    const postDate = date.format(new Date(), 'D MMMM YYYY | HH:mm');

    await addDoc(commentsRef(postId), {
      text: newComment,
      postDate,
      own: userId,
      ownAvatar: avatar,
      ownName: name,
    });
  } catch (error) {
    alert('Нажаль даний пост був видалений власником');
    console.log(error.message);
  }
};

export const getCommentsForPost = async (setComments, postId) => {
  try {
    const unsubscribe = onSnapshot(commentsRef(postId), (querySnapshot) => {
      const dataComments = querySnapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }));

      setComments(dataComments.reverse());
    });

    listeners.push(unsubscribe);
  } catch (error) {
    console.log(error);
  }
};

export const toggleLikeForPost = async (postId, userId, operation) => {
  try {
    const post = await postRef(postId);

    switch (operation) {
      case 'decrease':
        await updateDoc(post, {
          currentLikes: arrayRemove(userId),
        });
        break;
      case 'increase':
        await updateDoc(post, {
          currentLikes: arrayUnion(userId),
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};
