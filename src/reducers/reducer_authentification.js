import { SAVE_USER, CLEAR_AUTH, SET_USERNAME, VALIDATE_AUTH } from '../actions/auth_user';

const initialState = {
  user: {},
  isAuth: false,
  validate: { status: '', message: '' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      const newUser = action.payload;

      return {
        ...state,
        user: { ...state.user, ...newUser },
        isAuth: true,
      };

    case SET_USERNAME:
      let username;
      const users = action.payload.data;
      const userEmail = action.meta;

      for (let key in users) {
        if (users[key].email === userEmail) {
          username = users[key].username;
        }
      }
      return {
        ...state,
        user: { ...state.user, username },
      };

    case CLEAR_AUTH:
      return {
        ...state,
        user: null,
        isAuth: false,
      };

    case VALIDATE_AUTH:
      const { status, message } = action.payload;

      return {
        ...state,
        validate: { status, message },
      };

    default:
      return state;
  }
};
