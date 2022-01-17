export const USER_INFO = 'USER_INFO';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';
export const STANDARD_TIME = 'STANDARD_TIME';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';

export const saveInfoUser = (user) => ({
  type: USER_INFO,
  user,
});

export const saveTime = (time) => ({
  type: STANDARD_TIME,
  time,
});

export const saveLocalStorage = (ranking) => ({
  type: LOCAL_STORAGE,
  ranking,
});

export const registerToken = () => async (dispatch) => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  localStorage.setItem('token', token);
  dispatch({ type: REGISTER_TOKEN, token });
};
