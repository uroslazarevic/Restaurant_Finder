import { SEARCH_LOCATION, SEARCH_CUISINES, SEARCH_PLACES, SEARCH_COLLECTIONS, SEARCH_LOCATION_DETAILS } from '../actions'

const initialState = {
  searchedLocations: [],
  searchedCuisines: [],
  searchedPlaces: [],
  searchedCollections: [],
  searchedLocationDetails: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SEARCH_LOCATION:
      return { ...state, searchedLocation: action.payload.data.location_suggestions};

    case SEARCH_CUISINES:
      return { ...state, searchedCuisines: action.payload.data.categories};

    case SEARCH_PLACES:
      return { ...state, searchedPlaces: action.payload.data.restaurants}

    case SEARCH_COLLECTIONS:
      return { ...state, searchedCollections: action.payload.data.collections}

    case SEARCH_LOCATION_DETAILS:
      return { ...state, searchedLocationDetails: action.payload.data.best_rated_restaurant}

    default:
      return state;
  }
}