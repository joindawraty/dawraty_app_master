import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import LoaderReducer from './LoaderReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
export const Reducers = combineReducers({
  LoginReducer,
  RegisterReducer,
  LoaderReducer,
  AuthReducer,
  UserReducer,
});
