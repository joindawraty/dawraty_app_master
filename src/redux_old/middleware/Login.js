import * as actionTypes from '../_ActionsType';
import {LoginSuccess, LoginFail, LoginUpdate} from '../actions/_Login';
import {showLoader, hideLoader} from '../actions/_Loader';
import {apiRequest} from '../actions/_API';
import * as API from '../../services/API_URI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../navigation/RootNavigation';
export const initialLogin =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.LOGIN_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.LOGIN,
          null,
          actionTypes.LOGIN_SUCCESS,
          actionTypes.LOGIN_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.SOCIAL_LOGIN_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.SOCIALLOGIN,
          null,
          actionTypes.LOGIN_SUCCESS,
          actionTypes.LOGIN_FAIL,
          action.payload,
        ),
      );
    }
    next(action);
  };

export const loginSuccess =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.LOGIN_SUCCESS) {
      saveAccessToken(action.payload.data);
      let user = action.payload.data;
      dispatch(LoginUpdate(action.payload));
      // console.log("Access Token: ",action.payload.accessToken)
      dispatch(hideLoader());
    }
    next(action);
  };

export const loginFail =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.LOGIN_FAIL) {
      const data = action.payload;
      dispatch(LoginFail(data));
      dispatch(hideLoader());
    }
    next(action);
  };

export const saveAccessToken = async accessToken => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(accessToken));
  } catch (e) {
    console.log('User Saving Error: ', e);
  }

  const TOKEN = await AsyncStorage.getItem('user');
  // console.log("User: ",TOKEN)
};

export const loginMiddleware = [initialLogin, loginSuccess, loginFail];
