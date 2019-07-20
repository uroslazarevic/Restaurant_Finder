import { SIGNUP, SIGNIN, SIGN_OUT, RESET_PASSWORD } from '../actions/auth_user';

const initialState = {
  user: {},
  isAuth: false,
  authMessage: null,
  username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        isAuth: false,
        authMessage: action.payload.data.message,
      };

    case SIGNIN:
      return {
        ...state,
        isAuth: true,
        authMessage: action.payload.message,
        username: action.payload.username,
      };

    case SIGN_OUT:
      return {
        ...state,
        username: null,
        isAuth: false,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        authMessage: action.payload.data.message,
      };

    default:
      return state;
  }
};
