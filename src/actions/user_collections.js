import { axiosDB } from './../shared/axios_instances/axios_instances'
import _ from 'lodash'

export const GET_SAVED_COLLECTIONS = 'GET_SAVED_COLLECTIONS';
export const POST_SAVED_COLLECTIONS = 'POST_SAVED_COLLECTIONS';
export const CLEAR_COLLECTIONS = 'CLEAR_COLLECTIONS';

export function saveUserCollections(collection) {
  return {
    type: POST_SAVED_COLLECTIONS,
    payload: collection
  }
}

export function getUserCollections(authData, data) {
  const { username, token } = authData;
  const request = axiosDB.get(`/data/collections/${username}/saved.json?auth=${token}`)

  return {
    type: GET_SAVED_COLLECTIONS,
    payload: request
  }
}

export function saveCollectionInDB(collection) {
  return (dispatch, getState) => {
    const { username, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ username, token }))
      .then(res => {
        const oldCollections = res.payload.data;
        let newCollections = [];
        // MAKE NEW ARRAY FROM OBJ AND REMOVE IF ITEM MATCHES
        _.forEach(oldCollections, (item, key) => {
          if(item.collection.collection_id !== collection.collection.collection_id) {
            newCollections.push(item)
          }
        })
        // ADD NEW ITEM TO THE ARRAY
        newCollections.unshift(collection);
        // PUSH OUR NEW COLLECTIONS ARRAY IN DB
        axiosDB.put(`/data/collections/${username}/saved.json?auth=${token}`, newCollections)
           .then((res) => console.log(res) )
           .catch(error => console.log('Save Collections error:', error))
           //  // SAVE USER "SAVED COLLECTIONS" IN STORE
           dispatch(saveUserCollections(newCollections))
      })
      .catch(error => console.log(error))
  }
}

export function removeCollectionFromDB(collection) {
  return (dispatch, getState) => {
    const { username, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ username, token }))
      .then(res => {
        const oldCollections = res.payload.data;
        let newCollections = [];
        // MAKE NEW ARRAY FROM OBJ AND REMOVE IF ITEM MATCHES
        _.forEach(oldCollections, (item, key) => {
          if(item.collection.collection_id !== collection.collection.collection_id) {
            newCollections.push(item)
          }
        })

        axiosDB.put(`/data/collections/${username}/saved.json?auth=${token}`, newCollections)
           .then((res) => {
              console.log(res)
              // SAVE USER "SAVED COLLECTIONS" IN STORE
              dispatch(saveUserCollections(newCollections))
            } )
           .catch(error => console.log('Save Collections error:', error))
      })
      .catch(error => console.log(error))
  }
}

export function loadAllCollections() {
  return (dispatch, getState) => {
    const { username, token } = getState().authentification.user;
    // LOAD USER COLLECTIONS FROM DB
    dispatch(getUserCollections({ username, token }))
      .then(res => {
        const oldCollections = res.payload.data;
        // SAVE USER COLLECTIONS IN STORE
        dispatch(saveUserCollections(oldCollections))
      })
      .catch(error => console.log('LOADING COLLECTIONS FAILED:', error))
  }
}

export function clearCollections() {
  return {
    type: CLEAR_COLLECTIONS
  }
}