import * as actionTypes from '../_ActionsType';
import {showLoader, hideLoader} from '../actions/_Loader';
import {apiRequest} from '../actions/_API';
import * as API from '../../services/API_URI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../navigation/RootNavigation';
import {
  LogoutStart,
  updateStatusSuccess,
  UserPasswordFail,
  UserUpdate,
} from '../actions/_User';
import {successToast} from '../../util/toastUtils';

export const userdetail =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.UPDATE_USER_DETAIL) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.UPDATE_USER,
          null,
          actionTypes.USER_SUCCESS,
          actionTypes.USER_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_USER_DETAIL) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GETUSER,
          null,
          actionTypes.GET_USER_SUCCESS,
          actionTypes.USER_FAIL,
          action.payload,
        ),
      );
    }

    if (action.type === actionTypes.UPDATE_STATUS_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.UPDATESTATUS,
          null,
          actionTypes.UPDATE_STATUS_SUCCESS,
          actionTypes.UPDATE_STATUS_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.REGISTER_OTP_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.EMAIL_VERIFY,
          null,
          actionTypes.UPDATE_REGISTER_OTP,
          actionTypes.UPDATE_REGISTER_OTP_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.OTP_VERIFY_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.OTP_VERIFY,
          null,
          actionTypes.UPDATE_OTP_VERIFY,
          actionTypes.UPDATE_OTP_VERIFY_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_COURSES_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_COURSES,
          null,
          actionTypes.UPDATE_GET_COURSES,
          actionTypes.UPDATE_GET_COURSES_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_CATEGORIES_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_CATEGORIES,
          null,
          actionTypes.UPDATE_GET_CATEGORIES,
          actionTypes.UPDATE_GET_CATEGORIES_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_BANNERS_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_BANNERS,
          null,
          actionTypes.UPDATE_GET_BANNERS,
          actionTypes.UPDATE_GET_BANNERS_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.REGISTER_INSTRUCTOR_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.REGISTER_INSTRUCTOR,
          null,
          actionTypes.UPDATE_REGISTER_INSTRUCTOR,
          actionTypes.UPDATE_REGISTER_INSTRUCTOR_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_CARTCOUNT_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_CART_COUNT,
          null,
          actionTypes.UPDATE_GET_CARTCOUNT,
          actionTypes.UPDATE_GET_CARTCOUNT_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_CARTS_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_CART,
          null,
          actionTypes.UPDATE_GET_CARTS,
          actionTypes.UPDATE_GET_CARTS_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.ADD_CARTS_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.ADD_CART,
          null,
          actionTypes.UPDATE_ADD_CARTS,
          actionTypes.UPDATE_ADD_CARTS_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.DELETE_CARTS_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'DELETE',
          API.DELETE_CART.replace(':id', action.payload),
          null,
          actionTypes.UPDATE_DELETE_CARTS,
          actionTypes.UPDATE_DELETE_WISHLIST_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_COURSE_DETAIL_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.GET_COURSE.replace(':id', action.payload),
          null,
          actionTypes.UPDATE_COURSE_DETAIL,
          actionTypes.UPDATE_COURSE_DETAIL_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.GET_WISHLIST_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'GET',
          API.WISHLIST,
          null,
          actionTypes.UPDATE_GET_WISHLIST,
          actionTypes.UPDATE_GET_WISHLIST_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.ADD_WISHLIST_START) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.WISHLIST,
          null,
          actionTypes.UPDATE_ADD_WISHLIST,
          actionTypes.UPDATE_ADD_WISHLIST_DATA_FAIL,
          action.payload,
        ),
      );
    }
    if (action.type === actionTypes.DELETE_WISHLIST_START) {
      console.log(action);
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'DELETE',
          API.DELETE_WISHLIST.replace(':id', action.payload),
          null,
          actionTypes.UPDATE_DELETE_WISHLIST,
          actionTypes.UPDATE_DELETE_WISHLIST_DATA_FAIL,
          action.payload,
        ),
      );
    }
    next(action);
  };

export const userPassword =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.UPDATE_USER_PASSWORD) {
      dispatch(showLoader());
      dispatch(
        apiRequest(
          'POST',
          API.CHANGE_PASSWORD,
          null,
          actionTypes.USER_PASSWORD_SUCCESS,
          actionTypes.USER_PASSWORD_FAIL,
          action.payload,
        ),
      );
    }
    next(action);
  };

export const userSuccess =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.USER_SUCCESS) {
      if (action.payload.data != null) {
        AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(action.payload.data),
        );
        AsyncStorage.setItem('user', JSON.stringify(action.payload.data));
      } else {
        AsyncStorage.setItem('userDetails', JSON.stringify(action.payload));
        AsyncStorage.setItem('user', JSON.stringify(action.payload));
      }
      dispatch(UserUpdate(action.payload.data));
      // console.log("Access Token: ",action.payload.accessToken)
      dispatch(hideLoader());
      RootNavigation.navigate('Profile');
    }

    if (action.type === actionTypes.GET_USER_SUCCESS) {
      AsyncStorage.setItem('userDetails', JSON.stringify(action.payload.data));
      AsyncStorage.setItem('user', JSON.stringify(action.payload.data));
      dispatch(UserUpdate(action.payload.data));
      // console.log("Access Token: ",action.payload.accessToken)
      dispatch(hideLoader());
    }
    if (action.type === actionTypes.UPDATE_STATUS_SUCCESS) {
      dispatch(updateStatusSuccess(action.payload));
      dispatch(hideLoader());
    }
    next(action);
  };

export const userPasswordSuccess =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.USER_PASSWORD_SUCCESS) {
      AsyncStorage.setItem('userDetails', JSON.stringify(action.payload));
      successToast('Password changed successfully!');
      dispatch(LogoutStart(action.payload.data));
      // console.log("Access Token: ",action.payload.accessToken)
      dispatch(hideLoader());
      // RootNavigation.navigate('Profile')
    }
    next(action);
  };

export const userFail =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.USER_FAIL) {
      const data = action.payload;

      dispatch(UserPasswordFail(data));
      dispatch(hideLoader());
    }
    if (action.type === actionTypes.UPDATE_STATUS_FAIL) {
      dispatch(updateStatusFail(action.payload));
      dispatch(hideLoader());
    }
    next(action);
  };

export const userPasswordFail =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.USER_PASSWORD_FAIL) {
      const data = action.payload;

      dispatch(UserPasswordFail(data));
      dispatch(hideLoader());
    }
    next(action);
  };

export const logout =
  ({dispatch}) =>
  next =>
  action => {
    if (action.type === actionTypes.LOGOUT_START) {
      AsyncStorage.removeItem('userDetails');
      AsyncStorage.removeItem('user');
      RootNavigation.resetRouteAndNavigate('Login');
    }
    next(action);
  };

// export const selectRestaurant=({dispatch})=>next=>action=>{

//     if(action.type===actionTypes.SELECT_RESTAURANT){
//         getOrders(action.payload, dispatch)
//     }
//     next(action)
// }

export const userMiddleware = [
  userdetail,
  userSuccess,
  userPassword,
  userPasswordSuccess,
  userPasswordFail,
  userFail,
  logout,
];
