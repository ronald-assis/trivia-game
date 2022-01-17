import { combineReducers } from 'redux';
import nameUser from './Header';
import user from './Login';
import token from './token';
import saveTime from './saveTime';
import saveLocalStorage from './saveLocalStorage';

const rootReducers = combineReducers({
  nameUser,
  user,
  token,
  saveTime,
  saveLocalStorage,
});

export default rootReducers;
