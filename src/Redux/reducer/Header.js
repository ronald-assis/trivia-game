import { USER_INFO } from '../actions';

const INITIAL_STATE = {

  name: '',
  score: 0,
  gravatarEmail: '',

};

const nameUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  /* case NAME_USER: {
    return { ...state, name: action.user.name };
  } */
  case USER_INFO: {
    return {
      ...state,
      gravatarEmail: action.user.gravatarEmail,
      name: action.user.name,
    };
  }
  default:
    return state;
  }
};

export default nameUser;
