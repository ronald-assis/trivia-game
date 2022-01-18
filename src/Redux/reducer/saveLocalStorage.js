import { LOCAL_STORAGE, SAVE_SCORE, SAVE_HIT, ERASE_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  picture: '',
  score: 0,
  assertions: 0,
};

const saveLocalStorage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOCAL_STORAGE: {
    return {
      ...state,
      name: action.user.name,
      picture: action.user.picture,
    };
  }
  case SAVE_SCORE: {
    return {
      ...state,
      score: state.score + action.score,
    };
  }

  case ERASE_DATA: {
    return {
      ...INITIAL_STATE,
    };
  }

  case SAVE_HIT: {
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  }
  default:
    return state;
  }
};

export default saveLocalStorage;
