import { combineReducers } from 'redux';
import SearchedTerms from './reducer_searched_terms';
import UserCollections from './user_collections_reducer';
import Authentification from './reducer_authentification';
import EventBus from './event_bus_reducer';

const rootReducer = combineReducers({
  searchedTerms: SearchedTerms,
  userCollections: UserCollections,
  authentification: Authentification,
  eventBus: EventBus
});

export default rootReducer;