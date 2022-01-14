import { USER_INFO } from '../actions';

const INITIAL_STATE = {

  name: '',
  score: 0,

};

const nameUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO: {
    return {
      ...state,
      name: action.user.name,
    };
  }
  default:
    return state;
  }
};

export default nameUser;
