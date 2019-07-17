import * as ActionTypes from '../actions/errors';
import { combineReducers } from 'redux';
import SearchedTerms from './reducer_searched_terms';
import UserCollections from './user_collections_reducer';
import Authentification from './reducer_authentification';
import EventBus from './event_bus_reducer';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type } = action;
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (action.error) {
    if (!action.payload.data) {
      const message = `Error at action: ${type}`;
      console.log(message);
      return message;
    }
    const {
      data: { message },
    } = action.payload;
    return message;
  }

  return state;
};

const rootReducer = combineReducers({
  searchedTerms: SearchedTerms,
  userCollections: UserCollections,
  authentification: Authentification,
  eventBus: EventBus,
  errorMessage,
});

export default rootReducer;
