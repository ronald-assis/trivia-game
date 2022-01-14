export const NAME_USER = 'NAME_USER';
export const USER_INFO = 'USER_INFO';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';

/* export const saveNameUser = (header) => ({
  type: NAME_USER,
  header,
});
 */
export const saveInfoUser = (user, gravatarEmail) => ({
  type: USER_INFO,
  user,
  gravatarEmail,
});

export const registerToken = () => async (dispatch) => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  localStorage.setItem('token', token);
  dispatch({ type: REGISTER_TOKEN, token });
};
