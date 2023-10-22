import React, { createContext, useContext, useState } from 'react';

const CollectionContext = createContext();

import { posts } from '../data/posts';

const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState(posts);

  const addPost = (item) => {
    setCollection((prevState) => [item, ...prevState]);
  };

  const findById = (id) => collection.find((item) => item.id === id);

  return (
    <CollectionContext.Provider value={{ collection, addPost, findById }}>
      {children}
    </CollectionContext.Provider>
  );
};

const useCollection = () => useContext(CollectionContext);

export { CollectionProvider, useCollection };
