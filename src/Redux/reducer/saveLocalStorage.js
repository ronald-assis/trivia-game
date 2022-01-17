import { LOCAL_STORAGE } from '../actions';

const INITIAL_STATE = {
  name: '',
  picture: '',
  score: 0,
};

const saveLocalStorage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOCAL_STORAGE: {
    return {
      ...state,
      name: action.ranking.name,
      picture: action.ranking.picture,
      score: action.ranking.score,
    };
  }
  default:
    return state;
  }
};

export default saveLocalStorage;
