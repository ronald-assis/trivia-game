export const USER_INFO = 'USER_INFO';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';
export const STANDARD_TIME = 'STANDARD_TIME';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_HIT = 'SAVE_HIT';
export const ERASE_DATA = 'ERASE_DATA';

export const saveInfoUser = (user) => ({
  type: USER_INFO,
  user,
});

export const eraseData = () => ({
  type: ERASE_DATA,
});

export const saveTime = (time) => ({
  type: STANDARD_TIME,
  time,
});

export const saveLocalStorage = (user) => ({
  type: LOCAL_STORAGE,
  user,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const saveHit = (assertions) => ({
  type: SAVE_HIT,
  assertions,
});

export const registerToken = () => async (dispatch) => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  localStorage.setItem('token', token);
  dispatch({ type: REGISTER_TOKEN, token });
};
