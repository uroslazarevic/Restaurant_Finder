import { axiosZomato } from './../shared/axios_instances/axios_instances';
import qs from 'qs';

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const SEARCH_CATEGORIES = 'SEARCH_CATEGORIES';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_COLLECTIONS = 'SEARCH_COLLECTIONS';
export const SEARCH_LOCATION_DETAILS = 'SEARCH_LOCATION_DETAILS';
export const SEARCH_ESTABLISHMENTS = 'SEARCH_ESTABLISHMENTS';
export const SEARCH_CUISINES = 'SEARCH_CUISINES';
export const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';
export const SEARCH_RESTAURANT_DETAILS = 'SEARCH_RESTAURANT_DETAILS';
export const SEARCH_RESTAURANT_REVIEWS = 'SEARCH_RESTAURANT_REVIEWS';
export const SEARCH_COLLECTION_DETAILS = 'SEARCH_COLLECTION_DETAILS';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});

export function getSearchedLocation({ locationTerm = 'Bra', count = '10' } = {}) {
  const data = {
    q: locationTerm,
    count,
  };

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `cities?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_LOCATION,
    payload: request,
  };
}

export function getSearchedCategories() {
  const config = {
    method: 'GET',
    url: `categories`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_CATEGORIES,
    payload: request,
  };
}

export function getSearchedPlaces({
  placeTerm = '',
  entity_id = '',
  entity_type = 'city',
  radius = '',
  cuisines = '',
  establishment_type = '',
  collection_id = '',
  category = '',
  count = 9,
  sort = '',
  order = '',
} = {}) {
  const data = {
    entity_type,
    entity_id,
    q: placeTerm,
    radius,
    cuisines,
    establishment_type,
    collection_id,
    category,
    count,
    sort,
    order,
  };

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `search?${stringify}`,
  };
  const request = axiosZomato(config);

  return {
    type: SEARCH_PLACES,
    payload: request,
  };
}

export function getSearchedRestaurants({
  placeTerm = '',
  entity_id = '',
  entity_type = 'city',
  start = '',
  radius = '',
  cuisines = '',
  establishment_type = '',
  collection_id = '',
  category = '',
  count = '',
  sort = '',
  order = '',
} = {}) {
  const data = {
    entity_type,
    entity_id,
    q: placeTerm,
    radius,
    cuisines,
    establishment_type,
    collection_id,
    category,
    count,
    sort,
    order,
    start,
  };

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `search?${stringify}`,
  };
  const request = axiosZomato(config);

  return {
    type: SEARCH_RESTAURANTS,
    payload: request,
  };
}

export function getSearchedCollections({ city_id = '111', count = '5' } = {}) {
  const data = {
    city_id,
    count,
  };

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `collections?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_COLLECTIONS,
    payload: request,
  };
}

export function getLocationDetails({ entity_id = '111', entity_type = 'city' } = {}) {
  const data = {
    entity_id,
    entity_type,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `location_details?${stringify}`,
  };

  const request = axiosZomato(config);
  return {
    type: SEARCH_LOCATION_DETAILS,
    payload: request,
  };
}

export function getSearchedEstablishments({ city_id = '111' } = {}) {
  const data = {
    city_id,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `establishments?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_ESTABLISHMENTS,
    payload: request,
  };
}

export function getSearchedCuisines({ city_id = '111' } = {}) {
  const data = {
    city_id,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `cuisines?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_CUISINES,
    payload: request,
  };
}

export function getRestaurantDetails({ res_id = '' } = {}) {
  const data = {
    res_id,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `restaurant?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_RESTAURANT_DETAILS,
    payload: request,
  };
}
export function getRestaurantReviews({ res_id = '', start = '', count = 5 } = {}) {
  const data = {
    res_id,
    start,
    count,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `reviews?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_RESTAURANT_REVIEWS,
    payload: request,
  };
}

export function getCollectionDetails({
  entity_id = '111',
  entity_type = 'city',
  collection_id = 1,
} = {}) {
  const data = {
    entity_id,
    entity_type,
    collection_id,
  };

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `search?${stringify}`,
  };

  const request = axiosZomato(config);

  return {
    type: SEARCH_COLLECTION_DETAILS,
    payload: request,
  };
}
