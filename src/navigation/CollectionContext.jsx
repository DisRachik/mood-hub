import React, { createContext, useContext, useState } from 'react';
import date from 'date-and-time';

const CollectionContext = createContext();

import { posts } from '../data/posts';

const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState(posts);

  const addPost = (item) => {
    setCollection((prevState) => [item, ...prevState]);
  };

  const findById = (id) => collection.find((item) => item.id === id);

  const addComment = ({ newComment, idPost, idUser }) => {
    const updateCollection = collection.map((item) => {
      if (!item.id) {
      }

      if (item.id === idPost) {
        const createIdPost = item.comment.length ? item.comment.length + 1 : 1;
        const postDate = date.format(new Date(), 'D MMMM YYYY | HH:mm');
        const newCommentItem = {
          id: createIdPost,
          text: newComment,
          date: postDate,
          user: idUser,
        };
        item.comment = [...item.comment, newCommentItem];
      }
      return item;
    });

    setCollection(updateCollection);
  };

  return (
    <CollectionContext.Provider value={{ collection, addPost, findById, addComment }}>
      {children}
    </CollectionContext.Provider>
  );
};

const useCollection = () => useContext(CollectionContext);

export { CollectionProvider, useCollection };
