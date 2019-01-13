import { 
  POST_SAVED_COLLECTIONS,
  CLEAR_COLLECTIONS
} from '../actions/user_collections'

const initialState = {
  savedCollections: [],
  personalCollections: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case POST_SAVED_COLLECTIONS:
      return {...state, savedCollections: [ ...action.payload ] }
      
    case CLEAR_COLLECTIONS:
      return {...state, savedCollections: [], personalCollections: [] }

    default:
      return state;
  }
}