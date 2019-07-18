import React from 'react';

const collectionDetails = {
  searchedCollections: {},
  searchedCollectionDetails: {},
  collections: [],
  isAuth: null,
  requiredCollectionId: null,
  saveCollection: () => {},
  removeCollection: () => {},
  setVisibleFM: () => {},
};

export default React.createContext(collectionDetails);
