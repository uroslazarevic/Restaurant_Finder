import axios from 'axios';

const serverURL = process.env.REACT_APP_API_URL;
// console.log(process.env.REACT_APP_API_URL);

// const USER_KEY = 'e04e2c0fa2c828b065c75f191caaea13';
// const USER_KEY = '6facc9d7e203d8568aa7fff14038918f';
const USER_KEY = 'cdaf275cd76312ffb71ae60e7eb468cd';
const ZOMATO_URL = 'https://developers.zomato.com/api/v2.1/';

export const axiosZomato = axios.create({
  baseURL: ZOMATO_URL,
  headers: {
    'Content-Type': 'application/json',
    'user-key': USER_KEY,
  },
});

export const axiosServer = axios.create({
  baseURL: serverURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
