import {
  LOAD_COLLECTIONS,
  SAVE_COLLECTION,
  REMOVE_COLLECTION,
  CLEAR_COLLECTIONS,
  SEARCH_CREATED_COLLECTION_LOCATIONS,
  SEARCH_CREATED_COLLECTION_RESTAURANTS,
} from '../actions/user_collections';

const initialState = {
  collections: [],
  searchedLocations: [],
  searchedRestaurants: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      return { ...state, collections: action.payload };

    case REMOVE_COLLECTION:
      const newCollections = [...state.collections];
      newCollections.filter(collection => collection.collection_id === action.payload);
      return { ...state, collections: newCollections };

    case SAVE_COLLECTION:
      return { ...state, collections: [...state.collections, action.payload] };

    case CLEAR_COLLECTIONS:
      return { ...state, collections: [] };

    case SEARCH_CREATED_COLLECTION_LOCATIONS:
      return { ...state, searchedLocations: action.payload.data.location_suggestions };

    case SEARCH_CREATED_COLLECTION_RESTAURANTS:
      return { ...state, searchedRestaurants: action.payload.data.restaurants };

    default:
      return state;
  }
};
