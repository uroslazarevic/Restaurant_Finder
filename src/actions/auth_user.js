import { axiosServer } from './../shared/axios_instances/axios_instances';
import * as fromCollectionsActions from './user_collections';
import * as fromErrorActions from './errors';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGN_OUT = 'SIGN_OUT';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export function signup(formData) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axiosServer.post('/signup', {
          ...formData,
        });
        dispatch({
          type: SIGNUP,
          payload: request,
        });
        resolve(request);
      } catch (err) {
        dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
        reject(err);
      }
    });
  };
}

export function signin(formData) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axiosServer.post('/signin', {
          email: formData.email,
          password: formData.password,
        });
        const { authData } = request.data;
        setLocalStorage(authData);
        setLogoutTimer(authData.expiresIn, dispatch);

        dispatch([
          {
            type: SIGNIN,
            payload: { message: request.data.message, username: authData.username },
          },
          fromCollectionsActions.loadCollections(),
        ]);
        resolve(request);
      } catch (err) {
        dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
        reject(err);
      }
    });
  };
}

export function signOut() {
  return async dispatch => {
    const authData = getLocalStorage();
    try {
      await axiosServer.post('/signout', {
        userId: authData.userId,
        refreshToken: authData.tokens.refreshToken,
      });
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

export function refreshToken(callback = () => {}) {
  return async dispatch => {
    const authData = getLocalStorage();
    if (!authData) {
      return;
    }
    const {
      userId,
      tokens: { refreshToken },
    } = authData;
    try {
      const request = await axiosServer.post('/token', { userId, refreshToken });
      const { authData } = request.data;
      setLocalStorage(authData);
      setLogoutTimer(authData.expiresIn, dispatch);
      return dispatch([
        {
          type: SIGNIN,
          payload: { message: request.data.message, username: authData.username },
        },
        callback(),
      ]);
    } catch (err) {
      return dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
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

export function resetPassword(formData) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axiosServer.post('/reset-password', { email: formData.email });
        dispatch({
          type: RESET_PASSWORD,
          payload: request,
        });
        resolve(request);
      } catch (err) {
        dispatch({ type: fromErrorActions.UPDATE_ERROR_MESSAGE, payload: err.response, error: true });
        reject(err);
      }
    });
  };
}

const setLocalStorage = authData => {
  const now = Math.floor(Date.now() / 1000);
  const expirationDate = now + authData.expiresIn;
  const strAuthData = JSON.stringify({
    tokens: authData.tokens,
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

const setLogoutTimer = (expirationTime, dispatch) => {
  const authData = getLocalStorage();
  setTimeout(() => {
    if (!authData) {
      return;
    }
    dispatch(signOut());
  }, expirationTime * 1000);
};
