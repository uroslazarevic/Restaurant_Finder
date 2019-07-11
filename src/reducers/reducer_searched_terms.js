import { 
  SEARCH_LOCATION,
  SEARCH_CATEGORIES,
  SEARCH_PLACES,
  SEARCH_COLLECTIONS,
  SEARCH_LOCATION_DETAILS,
  SEARCH_ESTABLISHMENTS,
  SEARCH_CUISINES,
  SEARCH_RESTAURANTS,
  SEARCH_RESTAURANT_DETAILS,
  SEARCH_RESTAURANT_REVIEWS,
  SEARCH_COLLECTION_DETAILS

} from '../actions'

const initialState = {
  searchedLocations: [],
  searchedCategories: [],
  searchedPlaces: [],
  searchedCollections: [],
  searchedLocationDetails: [],
  searchedEstablishments: [],
  searchedCuisines: [],
  searchedRestaurants: [],
  searchedRestaurantDetails: [],
  searchedRestaurantReviews: [],
  searchedCollectionDetails: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SEARCH_LOCATION:
      return { ...state, searchedLocation: action.payload.data.location_suggestions};

    case SEARCH_CATEGORIES:
      return { ...state, searchedCategories: action.payload.data.categories};

    case SEARCH_PLACES:
      return { ...state, searchedPlaces: action.payload.data}

    case SEARCH_RESTAURANTS:
      return { ...state, searchedRestaurants: action.payload.data}

    case SEARCH_COLLECTIONS:
      return { ...state, searchedCollections: action.payload.data.collections}

    case SEARCH_LOCATION_DETAILS:
      return { ...state, searchedLocationDetails: action.payload.data}

    case SEARCH_ESTABLISHMENTS:
      return { ...state, searchedEstablishments: action.payload.data.establishments}

    case SEARCH_CUISINES:
      return { ...state, searchedCuisines: action.payload.data.cuisines}

    case SEARCH_RESTAURANT_DETAILS:
      return { ...state, searchedRestaurantDetails: action.payload.data}
      
      case SEARCH_RESTAURANT_REVIEWS:
        return { ...state, searchedRestaurantReviews: action.payload.data}
        
      case SEARCH_COLLECTION_DETAILS:
        return { ...state, searchedCollectionDetails: action.payload.data.restaurants}
      
    default:
      return state;
  }
}