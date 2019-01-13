import { combineReducers } from 'redux';
import SearchedTerms from './reducer_searched_terms';
import Collections from './reducer_collections';
import Authentification from './reducer_authentification';
import EventBus from './event_bus_reducer';

const rootReducer = combineReducers({
  searchedTerms: SearchedTerms,
  collections: Collections,
  authentification: Authentification,
  eventBus: EventBus
});

export default rootReducer;