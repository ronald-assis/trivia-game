import { combineReducers } from 'redux';
import nameUser from './Header';
import user from './Login';
import token from './token';

const rootReducers = combineReducers({
  nameUser,
  user,
  token,
});

export default rootReducers;
