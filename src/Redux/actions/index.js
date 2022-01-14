export const USER_INFO = 'USER_INFO';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';

export const saveInfoUser = (user) => ({
  type: USER_INFO,
  user,
});

export const registerToken = () => async (dispatch) => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  localStorage.setItem('token', token);
  dispatch({ type: REGISTER_TOKEN, token });
};
