import { SEARCH_LOCATION, SEARCH_CUISINES, SEARCH_PLACES } from '../actions'

const initialState = {
  searchedLocations: [],
  searchedCuisines: [],
  searchedPlaces: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SEARCH_LOCATION:
      return { ...state, searchedLocation: action.payload.data.location_suggestions};

    case SEARCH_CUISINES:
      return { ...state, searchedCuisines: action.payload.data.categories};

    case SEARCH_PLACES:
      return { ...state, searchedPlaces: action.payload.data.restaurants}

    default:
      return state;
  }
}