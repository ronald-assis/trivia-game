import { REGISTER_TOKEN } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_TOKEN:
    console.log(action);
    return action.token;

  default:
    return state;
  }
};

export default token;
