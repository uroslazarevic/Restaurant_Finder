import { SIGNUP, SIGNIN, SIGN_OUT } from '../actions/auth_user';

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

    default:
      return state;
  }
};
