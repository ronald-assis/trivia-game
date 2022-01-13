export const NAME_USER = 'NAME_USER';
export const USER_INFO = 'USER_INFO';

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
