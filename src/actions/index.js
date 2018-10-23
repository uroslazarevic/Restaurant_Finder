import axios from 'axios';
import qs from 'qs';

const USER_KEY = '6facc9d7e203d8568aa7fff14038918f';
const ROOT_URL = 'https://developers.zomato.com/api/v2.1/';

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const SEARCH_CUISINES = 'SEARCH_CUISINES';
export const SEARCH_PLACES = 'SEARCH_PLACES';

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

export function getSearchedCuisines() {

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
    type: SEARCH_CUISINES,
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

  const request = axios(config);

  return {
    type: SEARCH_PLACES,
    payload: request
  }
}