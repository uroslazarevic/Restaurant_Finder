import { 
  POST_USER_COLLECTIONS,
  CLEAR_COLLECTIONS,
  SEARCH_CREATED_COLLECTION_LOCATIONS,
  SEARCH_CREATED_COLLECTION_RESTAURANTS,
} from '../actions/user_collections'

import { user_Collections } from '../shared/data_naming/data_naming'

const initialState = {
  [user_Collections.saved.state]: [],     //  =>   savedCollection: []
  [user_Collections.personal.state]: [],  //  =>  personalCollections: []
  searchedLocations: [],
  searchedRestaurants: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case POST_USER_COLLECTIONS:
      return {...state, [action.meta]: [ ...action.payload ] }
      
    case CLEAR_COLLECTIONS:
      return {...state, savedCollections: [], personalCollections: [] }

    case SEARCH_CREATED_COLLECTION_LOCATIONS:
      return { ...state, searchedLocations: action.payload.data.location_suggestions };

    case SEARCH_CREATED_COLLECTION_RESTAURANTS:
      return { ...state, searchedRestaurants: action.payload.data.restaurants };
      
    default:
      return state;
  }
}