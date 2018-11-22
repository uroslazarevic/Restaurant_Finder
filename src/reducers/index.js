import { combineReducers } from 'redux';
import SearchedTerms from './reducer_searched_terms'


const rootReducer = combineReducers({
  searchedTerms: SearchedTerms
});

export default rootReducer;