import qs from 'qs';
import _ from 'lodash';
import { axiosDB, axiosZomato } from './../shared/axios_instances/axios_instances';
import { user_Collections } from './../shared/data_naming/data_naming';

export const GET_USER_COLLECTIONS = 'GET_USER_COLLECTIONS';
export const POST_USER_COLLECTIONS = 'POST_USER_COLLECTIONS';
export const CLEAR_COLLECTIONS = 'CLEAR_COLLECTIONS';
export const SEARCH_CREATED_COLLECTION_LOCATIONS = 'SEARCH_CREATED_COLLECTION_LOCATIONS';
export const SEARCH_CREATED_COLLECTION_RESTAURANTS = 'SEARCH_CREATED_COLLECTION_RESTAURANTS';

/* USER COLLECTION ACTION CREATORS */

export function getUserCollections(authData, DBEndpoint) {
  const { userId, token } = authData;
  const request = axiosDB.get(`/data/collections/${userId}/${DBEndpoint}.json?auth=${token}`);

  return {
    type: GET_USER_COLLECTIONS,
    payload: request,
  };
}

export function saveUserCollections(myCollection, state) {
  return {
    type: POST_USER_COLLECTIONS,
    payload: myCollection,
    meta: state,
  };
}

export function saveCollectionInDB(collection, collectionType) {
  return (dispatch, getState) => {
    const { userId, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ userId, token }, collectionType.DBEndpoint))
      .then(res => {
        const newColls = [];
        const oldColls = res.payload.data;
        // MAKE NEW ARRAY FROM OBJ AND REMOVE IF ITEM MATCHES
        _.forEach(oldColls, item => {
          if (item.collection.collection_id !== collection.collection.collection_id) {
            newColls.push(item);
          }
        });

        // ADD NEW ITEM TO THE ARRAY
        newColls.unshift(collection);
        // PUSH OUR NEW COLLECTIONS ARRAY IN DB
        axiosDB
          .put(`/data/collections/${userId}/${collectionType.DBEndpoint}.json?auth=${token}`, newColls)
          .then(res => console.log(`Response collections of type ${collectionType.DBEndpoint} `, res))
          .catch(error => console.log(`Error collections of type ${collectionType.dataEndpoint}:`, error));
        // SAVE USER "SAVED COLLECTIONS" IN STORE
        dispatch(saveUserCollections(newColls, collectionType.state));
      })
      .catch(error => {
        console.log('ERROR:', error);
      });
  };
}

export function removeCollectionFromDB(collection, collectionType) {
  return (dispatch, getState) => {
    const { userId, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ userId, token }, collectionType.DBEndpoint))
      .then(res => {
        const oldColls = res.payload.data;
        const newColls = [];
        // MAKE NEW ARRAY FROM OBJ AND REMOVE IF ITEM MATCHES
        _.forEach(oldColls, item => {
          if (item.collection.collection_id !== collection.collection.collection_id) {
            newColls.push(item);
          }
        });

        // PUSH OUR NEW COLLECTIONS ARRAY IN DB
        axiosDB
          .put(`/data/collections/${userId}/${collectionType.DBEndpoint}.json?auth=${token}`, newColls)
          .then(res => {
            console.log(res);
            // SAVE USER "SAVED COLLECTIONS" IN STORE
            dispatch(saveUserCollections(newColls, collectionType.state));
          })
          .catch(error => console.log('Save Collections error:', error));
      })
      .catch(error => console.log(error));
  };
}

export function loadAllCollections() {
  return (dispatch, getState) => {
    const { userId, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ userId, token }, user_Collections.saved.DBEndpoint)).then(res => {
      // Save USER SAVED COLLECTIONS
      const oldSavedColls = res.payload.data;
      dispatch(saveUserCollections(oldSavedColls, user_Collections.saved.state));
    });
    // Save USER PERSONAL COLLECTIONS
    dispatch(getUserCollections({ userId, token }, 'personal')).then(res => {
      const oldPersonalColls = res.payload.data;
      dispatch(saveUserCollections(oldPersonalColls, user_Collections.personal.state));
    });
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
