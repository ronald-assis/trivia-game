import { combineReducers } from 'redux';
import nameUser from './Header';
import user from './Login';
import token from './token';
import saveLocalStorage from './saveLocalStorage';

const rootReducers = combineReducers({
  nameUser,
  user,
  token,
  player: saveLocalStorage,
});

export default rootReducers;
