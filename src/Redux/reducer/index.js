import { combineReducers } from 'redux';
import nameUser from './Header';
import user from './Login';

const rootReducers = combineReducers({
  nameUser,
  user,

});

export default rootReducers;
