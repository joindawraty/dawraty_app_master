import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNavigatorFactory} from '@react-navigation/native';
import * as actionTypes from '../_ActionsType';
import {updateObject} from './utility';

const initialState = {
  userDetails: null,
  error: null,
  restaurant: null,
};

let timer = null;

const userDetail = (action, state) => {
  // console.log("UserDetails", action)
  return updateObject(state, {
    userDetails: action.payload,
    error: null,
  });
};

const logout = (action, state) => {
  AsyncStorage.removeItem('userDetail');
  return updateObject(state, {
    userDetails: null,
    error: null,
  });
};

const restaurantUpdate = (action, state) => {
  // console.log(action.payload)
  return updateObject(state, {
    isAuthenticated: true,
    restaurant: action.payload,
    error: null,
  });
};

const updateStatusFail = (action, state) => {
  return updateObject(state, {
    error: action.payload,
  });
};

const updateStatusSuccess = (action, state) => {
  return updateObject(state, {
    userDetails: action.payload.data,
    error: null,
  });
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAIL:
      return userDetail(action, state);
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
      return userDetail(action, state);
    case actionTypes.SELECT_RESTAURANT:
      return restaurantUpdate(action, state);
    case actionTypes.UPDATE_STATUS_DATA_SUCCESS:
      return updateStatusSuccess(action, state);
    case actionTypes.UPDATE_STATUS_DATA_FAIL:
      return updateStatusFail(action, state);
    default:
      return state;
  }
};

export default AuthReducer;
