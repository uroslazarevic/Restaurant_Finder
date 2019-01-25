import { axiosAuth, axiosDB } from './../shared/axios_instances/axios_instances';
import { clearCollections } from './user_collections';
import history from './../shared/history';

const PROJECT_KEY = 'AIzaSyDw3nLzSIMD7kl2n9_V7oE4M8-ghR_ZPSE';

export const SAVE_USER = 'SAVE_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const VALIDATE_AUTH = 'VALIDATE_AUTH';

export function signupUser(formData) {
  return axiosAuth.post(`/signupNewUser?key=${PROJECT_KEY}`, {
    email: formData.email,
    password: formData.password,
    returnSecureToken: true,
  });
}

export function saveUserInStore(user) {
  return {
    type: SAVE_USER,
    payload: user,
  };
}

function setLogoutTimer(dispatch, expirationTime) {
  setTimeout(() => {
    dispatch(clearAuth(dispatch));
  }, expirationTime * 1000);
}

export function clearAuth() {
  history.replace('/');
  return dispatch => {
    // Clear Local Storage
    localStorage.clear();
    dispatch(clearCollections());
    dispatch({ type: CLEAR_AUTH });
  };
}

function loginUser(formData) {
  return axiosAuth.post(`/verifyPassword?key=${PROJECT_KEY}`, {
    email: formData.email,
    password: formData.password,
    returnSecureToken: true,
  });
}

function setUsername(authData) {
  const request = axiosDB.get(`/users.json?auth=${authData.idToken}`);

  return {
    type: SET_USERNAME,
    payload: request,
    meta: authData.email,
  };
}

export function signup(formData) {
  return async dispatch => {
    await signupUser(formData)
      .then(response => {
        dispatch(validateAuth({ status: response.status, message: null }));
        const { expiresIn, idToken, localId } = response.data;
        const { email, username } = formData;
        const user = {
          token: idToken,
          userId: localId,
          email,
          username,
        };

        // Set Local Storage
        setLocalStorage({ expiresIn, idToken, localId, email });
        // Store User in Database
        axiosDB.post(`/users.json?auth=${idToken}`, formData);
        // Save User In Store
        dispatch(saveUserInStore(user));
        // Set Logout Timer
        setLogoutTimer(dispatch, expiresIn);
      })
      .catch(error => {
        const { status } = error.response;
        const { message } = error.response.data.error;
        dispatch(validateAuth({ status, message }));
      });
  };
}

export function login(formData) {
  return async dispatch => {
    await loginUser(formData)
      .then(response => {
        dispatch(validateAuth({ status: response.status, message: null }));
        const { expiresIn, idToken, localId } = response.data;
        const { email } = formData;

        const user = {
          token: idToken,
          userId: localId,
          email,
        };

        // Set Local Storage
        setLocalStorage({ expiresIn, idToken, localId, email });
        // Set User Username
        dispatch(setUsername({ email, idToken })).then(() => {
          // Save User In Store
          dispatch(saveUserInStore(user));
        });
        // Set Logout Timer
        setLogoutTimer(dispatch, expiresIn);
      })
      .catch(error => {
        const { status } = error.response;
        const { message } = error.response.data.error;
        dispatch(validateAuth({ status, message }));
      });
  };
}

function setLocalStorage(authData) {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
  localStorage.setItem('token', authData.idToken);
  localStorage.setItem('userId', authData.localId);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('email', authData.email);
}

export function tryAutoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (!token || now >= expirationDate) {
      return;
    }
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');

    const user = {
      token,
      userId,
      email,
    };
    // Set User Username
    dispatch(setUsername({ email, idToken: token })).then(() => {
      // Save User In Store
      dispatch(saveUserInStore(user));
    });
  };
}

function validateAuth(payload) {
  return {
    type: VALIDATE_AUTH,
    payload,
  };
}

// export function emailVerification(idToken) {
//   return axiosAuth.post(`/getOobConfirmationCode?key=${PROJECT_KEY}`, {
//     requestType: "VERIFY_EMAIL",
//     idToken
//   } )
// }

// export function emailConfirmation(idToken) {
//   return axiosAuth.post(`/setAccountInfo?key=${PROJECT_KEY}`, {
//     oobCode: '????'
//   } )
// }
