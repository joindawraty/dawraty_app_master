import * as actionTypes from '../_ActionsType';
import {RegisterUpdate, RegisterFailUpdate} from '../actions/_Register';
import {showLoader, hideLoader} from '../actions/_Loader';
import {apiRequest} from '../actions/_API';
import * as API from '../../services/API_URI';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const initialRegister =
  ({dispatch}) =>
  next =>
  action => {
    // console.log(action)
    if (action.type === actionTypes.REGISTER_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.REGISTER_STUDENT,
          null,
          actionTypes.REGISTER_SUCCESS,
          actionTypes.REGISTER_FAIL,
          action.payload,
        ),
      );
    }
    next(action);
  };

export const registerSuccess =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.REGISTER_SUCCESS) {
      dispatch(RegisterUpdate(action.payload));
      saveAccessToken(action.payload.data);
      dispatch(hideLoader());
    }

    next(action);
  };

export const registerFail =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.REGISTER_FAIL) {
      const data = action.payload;

      dispatch(RegisterFailUpdate(data));
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
  console.log('User: ', TOKEN);
};

export const registerMiddleware = [
  initialRegister,
  registerSuccess,
  registerFail,
];
