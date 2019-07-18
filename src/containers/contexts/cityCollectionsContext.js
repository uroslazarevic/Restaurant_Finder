import React from 'react';

const cityCollections = {
  searchedCollections: [],
  searchedLocations: [],
  searchedRestaurants: [],
  collections: [],
  debouncedSearchLocations: () => {},
  debouncedSearchRestaurants: () => {},
  saveCollection: () => {},
  city: {},
};

export default React.createContext(cityCollections);
