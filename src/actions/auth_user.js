import { axiosServer } from './../shared/axios_instances/axios_instances';
import * as fromCollectionsActions from './user_collections';
import * as fromErrorActions from './errors';

import history from './../shared/history';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGN_OUT = 'SIGN_OUT';

export function signup(formData) {
  return async dispatch => {
    try {
      const request = await axiosServer.post('/signup', {
        ...formData,
      });
      dispatch([
        {
          type: fromErrorActions.RESET_ERROR_MESSAGE,
        },
        {
          type: SIGNUP,
          payload: request,
        },
      ]);
    } catch (err) {
      dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
    }
  };
}

export function signin(formData) {
  return async (dispatch, getState) => {
    try {
      const request = await axiosServer.post('/signin', {
        email: formData.email,
        password: formData.password,
      });
      const { authData } = request.data;
      const isAuth = getState().authentification.isAuth;
      setLocalStorage(authData);
      setLogoutTimer(authData.expiresIn, isAuth);

      dispatch([
        {
          type: SIGNIN,
          payload: { message: request.data.message, username: authData.username },
        },
        {
          type: fromErrorActions.RESET_ERROR_MESSAGE,
        },
      ]);
    } catch (err) {
      dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
    }
  };
}

export function signOut() {
  return async dispatch => {
    const authData = getLocalStorage();
    try {
      await axiosServer.post('/signout', {
        userId: authData.userId,
        token: authData.token,
      });
      // Clear Local Storage
      history.replace('/');
      localStorage.clear();
      dispatch([
        {
          type: SIGN_OUT,
        },
        {
          type: fromCollectionsActions.CLEAR_COLLECTIONS,
        },
      ]);
    } catch (err) {
      dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
    }
  };
}

export function tryAutoSignin() {
  return dispatch => {
    const authData = getLocalStorage();
    const now = Date.now();
    if (!authData || now >= authData.expirationDate) {
      return;
    }

    dispatch({
      type: SIGNIN,
      payload: { message: '', username: authData.username },
    });
  };
}

export function verifyEmail(token) {
  return async dispatch => {
    try {
      await axiosServer.post('/confirm-email', { token });
      history.replace('/');
    } catch (err) {
      dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
    }
  };
}

const setLocalStorage = authData => {
  const now = Math.floor(Date.now() / 1000);
  const expirationDate = now + authData.expiresIn;
  const strAuthData = JSON.stringify({
    token: authData.token,
    userId: authData.userId,
    username: authData.username,
    expirationDate,
  });
  localStorage.setItem('authData', strAuthData);
};

export function getLocalStorage() {
  const strAuthData = localStorage.getItem('authData');
  const authData = JSON.parse(strAuthData);
  return authData;
}

const setLogoutTimer = (expirationTime, isAuth) => {
  setTimeout(() => {
    if (!isAuth) {
      return;
    }
    signOut();
  }, expirationTime * 1000);
};
