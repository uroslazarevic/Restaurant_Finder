import axios from 'axios';

const AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const DATABASE_URL = 'https://resfinder-14861.firebaseio.com';

// const USER_KEY = 'e04e2c0fa2c828b065c75f191caaea13';
// const USER_KEY = '6facc9d7e203d8568aa7fff14038918f';
const USER_KEY = 'cdaf275cd76312ffb71ae60e7eb468cd';
const ZOMATO_URL = 'https://developers.zomato.com/api/v2.1/';

export const axiosZomato =  axios.create({
  baseURL: ZOMATO_URL,
  headers: {
    'Content-Type': 'application/json',
    'user-key': USER_KEY
  }
});

export const axiosAuth = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const axiosDB = axios.create({
  baseURL: DATABASE_URL
});
