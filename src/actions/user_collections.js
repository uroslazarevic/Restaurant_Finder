import qs from 'qs';
import _ from 'lodash';
import { axiosZomato, axiosServer } from './../shared/axios_instances/axios_instances';
import { getLocalStorage } from './auth_user';
import * as fromAuthActions from './auth_user';

export const REMOVE_COLLECTION = 'REMOVE_COLLECTION';
export const SAVE_COLLECTION = 'SAVE_COLLECTION';
export const LOAD_COLLECTIONS = 'LOAD_COLLECTIONS';
export const CLEAR_COLLECTIONS = 'CLEAR_COLLECTIONS';
export const SEARCH_CREATED_COLLECTION_LOCATIONS = 'SEARCH_CREATED_COLLECTION_LOCATIONS';
export const SEARCH_CREATED_COLLECTION_RESTAURANTS = 'SEARCH_CREATED_COLLECTION_RESTAURANTS';

export function saveCollection(collection) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      let modifiedRestaurants;
      if (collection.type === 'personal') {
        modifiedRestaurants = collection.restaurants.map(res => {
          const {
            name,
            featured_image,
            cuisines,
            location: { locality_verbose },
            user_rating: { rating_color, aggregate_rating },
            R: { res_id },
          } = res.restaurant;
          return {
            name,
            featured_image,
            cuisines,
            locality_verbose,
            rating_color,
            aggregate_rating,
            res_id,
          };
        });
      }
      const collectionToSave = modifiedRestaurants ? { ...collection, restaurants: modifiedRestaurants } : collection;
      const authData = getLocalStorage();
      try {
        const request = await axiosServer.post(
          '/collection/save',
          { collection: collectionToSave },
          { headers: { Authorization: `Bearer ${authData.tokens.accessToken}` } }
        );
        dispatch({
          type: SAVE_COLLECTION,
          payload: collection,
        });
        resolve(request);
      } catch (err) {
        console.log(err.response);
        dispatch(fromAuthActions.refreshToken());
        reject(err);
      }
    });
  };
}

export function removeCollection(collectionId) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const authData = getLocalStorage();
      try {
        const request = await axiosServer.post(
          '/collection/remove',
          { collectionId },
          { headers: { Authorization: `Bearer ${authData.tokens.accessToken}` } }
        );
        dispatch({
          type: REMOVE_COLLECTION,
          payload: collectionId,
        });
        resolve(request);
      } catch (err) {
        console.log(err.response);
        dispatch(fromAuthActions.refreshToken());
        reject(err);
      }
    });
  };
}

export function loadCollections() {
  return async dispatch => {
    const authData = getLocalStorage();
    if (!authData) {
      return;
    }
    try {
      const request = await axiosServer.post(
        '/collection/load',
        {},
        { headers: { Authorization: `Bearer ${authData.tokens.accessToken}` } }
      );
      dispatch({
        type: LOAD_COLLECTIONS,
        payload: request.data.collections,
      });
    } catch (err) {
      console.log(err.response);
      dispatch(fromAuthActions.refreshToken(loadCollections));
    }
  };
}

export function clearCollections() {
  return {
    type: CLEAR_COLLECTIONS,
  };
}

/* PERSONAL COLLECTION INPUT DATA TRACKER */

function searchLocations({ locationTerm = 'Bra', count = '6' } = {}) {
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
    type: SEARCH_CREATED_COLLECTION_LOCATIONS,
    payload: request,
  };
}

const innerDebounceSL = _.debounce(
  (dispatch, args) =>
    setTimeout(() => {
      console.log(args);
      dispatch(searchLocations(args));
    }, 0),
  250
);
export const debouncedSearchLocations = args => async dispatch => await innerDebounceSL(dispatch, args);

function searchRestaurants({ placeTerm = '', entity_id = '', entity_type = 'city', count = 9 } = {}) {
  const data = {
    entity_type,
    entity_id,
    q: placeTerm,
    count,
  };

  const stringify = qs.stringify(data);

  const config = {
    method: 'GET',
    url: `search?${stringify}`,
  };
  const request = axiosZomato(config);

  return {
    type: SEARCH_CREATED_COLLECTION_RESTAURANTS,
    payload: request,
  };
}

const innerDebounceSR = _.debounce((dispatch, args) => setTimeout(() => dispatch(searchRestaurants(args)), 0), 250);
export const debouncedSearchRestaurants = args => dispatch => innerDebounceSR(dispatch, args);
