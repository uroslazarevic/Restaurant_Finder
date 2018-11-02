import { SEARCH_LOCATION, SEARCH_CATEGORIES, SEARCH_PLACES, SEARCH_COLLECTIONS, SEARCH_LOCATION_DETAILS, SEARCH_ESTABLISHMENTS, SEARCH_CUISINES } from '../actions'

const initialState = {
  searchedLocations: [],
  searchedCategories: [],
  searchedPlaces: [],
  searchedCollections: [],
  searchedLocationDetails: [],
  searchedEstablishments: [],
  searchedCuisines: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SEARCH_LOCATION:
      return { ...state, searchedLocation: action.payload.data.location_suggestions};

    case SEARCH_CATEGORIES:
      return { ...state, searchedCategories: action.payload.data.categories};

    case SEARCH_PLACES:
      return { ...state, searchedPlaces: action.payload.data}

    case SEARCH_COLLECTIONS:
      return { ...state, searchedCollections: action.payload.data.collections}

    case SEARCH_LOCATION_DETAILS:
      return { ...state, searchedLocationDetails: action.payload.data}

    case SEARCH_ESTABLISHMENTS:
      return { ...state, searchedEstablishments: action.payload.data.establishments}

    case SEARCH_CUISINES:
      return { ...state, searchedCuisines: action.payload.data.cuisines}

    default:
      return state;
  }
}