import axios from 'axios';
import qs from 'qs';

const USER_KEY = 'e04e2c0fa2c828b065c75f191caaea13';
// const USER_KEY = '6facc9d7e203d8568aa7fff14038918f';
const ROOT_URL = 'https://developers.zomato.com/api/v2.1/';

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const SEARCH_CATEGORIES = 'SEARCH_CATEGORIES';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SEARCH_COLLECTIONS = 'SEARCH_COLLECTIONS';
export const SEARCH_LOCATION_DETAILS = 'SEARCH_LOCATION_DETAILS';
export const SEARCH_ESTABLISHMENTS = 'SEARCH_ESTABLISHMENTS';
export const SEARCH_CUISINES = 'SEARCH_CUISINES';
export const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';

export function getSearchedLocation ({locationTerm = 'Bra', count='10'} = {}) {
  const data = {
    q: locationTerm,
    count
  }

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `${ROOT_URL}cities?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_LOCATION,
    payload: request
  };
}

export function getSearchedCategories() {

  const config = {
    method: 'GET',
    url: `${ROOT_URL}categories`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_CATEGORIES,
    payload: request
  }
}

export function getSearchedPlaces({ 
  placeTerm = '',
  entity_id = '',
  entity_type = 'city',
  radius = '' ,
  cuisines = '',
  establishment_type = '',
  collection_id = '',
  category = '',
  count = 9,
  sort = '',
  order = ''
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
    order
  }

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `${ROOT_URL}search?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }
  const request = axios(config)

  return {
    type: SEARCH_PLACES,
    payload: request
  }
}

export function getSearchedRestaurants({ 
  placeTerm = '',
  entity_id = '',
  entity_type = 'city',
  radius = '' ,
  cuisines = '',
  establishment_type = '',
  collection_id = '',
  category = '',
  count = 9,
  sort = '',
  order = ''
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
    order
  }

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `${ROOT_URL}search?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }
  const request = axios(config)

  return {
    type: SEARCH_RESTAURANTS,
    payload: request
  }
}

export function getSearchedCollections({city_id = '111', count = '5'} = {}) {

  const data = {
    city_id,
    count
  }

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `${ROOT_URL}collections?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_COLLECTIONS,
    payload: request
  }
}

export function getLocationDetails({entity_id = '111', entity_type = 'city'} = {}) {

  const data = {
    entity_id,
    entity_type
  }

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `${ROOT_URL}location_details?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_LOCATION_DETAILS,
    payload: request
  }
}

export function getSearchedEstablishments({city_id = '111'} = {}) {

  const data = {
    city_id
  }

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `${ROOT_URL}establishments?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_ESTABLISHMENTS,
    payload: request
  }
}

export function getSearchedCuisines({city_id = '111'} = {}) {

  const data = {
    city_id
  }

  const stringify = qs.stringify(data);
  const config = {
    method: 'GET',
    url: `${ROOT_URL}cuisines?${stringify}`,
    headers: {
      'Content-Type': 'application/json',
      'user-key': USER_KEY
    }
  }

  const request = axios(config);

  return {
    type: SEARCH_CUISINES,
    payload: request
  }
}