import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../_ActionsType';
import {updateObject} from './utility';
import {_User} from '../actions/_User';

const initialState = {
  isAuthenticated: false,
  data: null,
  error: null,
  otpVerify: null,
  emailVerify: null,
  courses: [],
  categories: [],
  banners: [],
  cartcount: null,
  cart: [],
  cartInfo: null,
  courseDetail: null,
  wishList: [],
  wishResponse: null,
  deleteWishResponse: null,
};

const registerVerifyUpdate = (action, state) => {
  return updateObject(state, {
    emailVerify: action.payload,
    error: null,
  });
};

const registerVerifyFail = (action, state) => {
  return updateObject(state, {
    emailVerify: null,
    error: action.payload,
  });
};

const userSuccess = (action, state) => {
  // console.log("Success", action)
  AsyncStorage.setItem('userDetail', JSON.stringify(action.payload));
  return updateObject(state, {
    data: action.payload.data,
    error: null,
  });
};

const userFail = (action, state) => {
  return updateObject(state, {
    data: null,
    error: action.payload,
  });
};

const bannersSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    banners: action.payload.data,
    error: null,
  });
};

const bannersFail = (action, state) => {
  return updateObject(state, {
    banners: [],
    error: action.payload,
  });
};

const wishListSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    wishList: action.payload.data,
    error: null,
  });
};

const wishListFail = (action, state) => {
  return updateObject(state, {
    wishList: [],
    error: action.payload,
  });
};

const addWishSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    wishResponse: action.payload,
    error: null,
  });
};

const addWishFail = (action, state) => {
  return updateObject(state, {
    wishResponse: [],
    error: action.payload,
  });
};

const deleteWishSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    deleteWishResponse: action.payload,
    error: null,
  });
};

const deleteWishFail = (action, state) => {
  return updateObject(state, {
    deleteWishResponse: null,
    error: action.payload,
  });
};

const courseDetailSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    courseDetail: action.payload.data,
    error: null,
  });
};

const courseDetailFail = (action, state) => {
  return updateObject(state, {
    courseDetail: null,
    error: action.payload,
  });
};

const cartCountSuccess = (action, state) => {
  return updateObject(state, {
    cartcount: action.payload.data,
    error: null,
  });
};

const cartCountFail = (action, state) => {
  return updateObject(state, {
    cartcount: null,
    error: action.payload,
  });
};

const cartsSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    cart: action.payload.data,
    error: null,
  });
};

const cartsFail = (action, state) => {
  return updateObject(state, {
    cart: [],
    error: action.payload,
  });
};

const addCartSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    cartInfo: action.payload,
    error: null,
  });
};

const addCartFail = (action, state) => {
  return updateObject(state, {
    cartInfo: null,
    error: action.payload,
  });
};

const coursesSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    courses: action.payload.data,
    error: null,
  });
};

const coursesFail = (action, state) => {
  return updateObject(state, {
    courses: [],
    error: action.payload,
  });
};

const categoriesSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    categories: action.payload.data,
    error: null,
  });
};

const categoriesFail = (action, state) => {
  return updateObject(state, {
    categories: [],
    error: action.payload,
  });
};

const otpSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    otpVerify: action.payload,
    error: null,
  });
};

const otpFail = (action, state) => {
  return updateObject(state, {
    otpVerify: null,
    error: action.payload,
  });
};

const userPasswordSuccess = (action, state) => {
  // console.log("Success", action)
  return updateObject(state, {
    data: action.payload,
    error: null,
  });
};

const userPasswordFail = (action, state) => {
  console.log(action);
  return updateObject(state, {
    data: null,
    error: action.payload,
  });
};

const RemoveError = (action, state) => {
  return updateObject(state, {
    otpVerify: null,
    error: null,
    emailVerify: null,
    courseDetail: null,
    deleteWishResponse: null,
    wishResponse: null,
  });
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOGIN_DATA_SUCCESS:
      return userSuccess(action, state);
    case actionTypes.UPDATE_LOGIN_DATA_FAIL:
      return userFail(action, state);
    case actionTypes.UPDATE_REGISTER:
      return userSuccess(action, state);
    case actionTypes.UPDATE_REGISTER_DATA_FAIL:
      return userFail(action, state);
    case actionTypes.UPDATE_REGISTER_INSTRUCTOR:
      return userSuccess(action, state);
    case actionTypes.UPDATE_REGISTER_INSTRUCTOR_DATA_FAIL:
      return userFail(action, state);
    case actionTypes.UPDATE_OTP_VERIFY:
      return otpSuccess(action, state);
    case actionTypes.UPDATE_OTP_VERIFY_FAIL:
      return otpFail(action, state);
    case actionTypes.UPDATE_USER_PASSWORD_SUCCESS:
      return userPasswordSuccess(action, state);
    case actionTypes.UPDATE_USER_PASSWORD_FAIL:
      return userPasswordFail(action, state);
    case actionTypes.UPDATE_REGISTER_OTP:
      return registerVerifyUpdate(action, state);
    case actionTypes.UPDATE_REGISTER_OTP_DATA_FAIL:
      return registerVerifyFail(action, state);
    case actionTypes.UPDATE_GET_COURSES:
      return coursesSuccess(action, state);
    case actionTypes.UPDATE_GET_COURSES_DATA_FAIL:
      return coursesFail(action, state);
    case actionTypes.UPDATE_GET_CATEGORIES:
      return categoriesSuccess(action, state);
    case actionTypes.UPDATE_GET_CATEGORIES_DATA_FAIL:
      return categoriesFail(action, state);
    case actionTypes.UPDATE_GET_BANNERS:
      return bannersSuccess(action, state);
    case actionTypes.UPDATE_GET_BANNERS_DATA_FAIL:
      return bannersFail(action, state);
    case actionTypes.UPDATE_GET_CARTCOUNT:
      return cartCountSuccess(action, state);
    case actionTypes.UPDATE_GET_CARTCOUNT_DATA_FAIL:
      return cartCountFail(action, state);
    case actionTypes.UPDATE_GET_CARTS:
      return cartsSuccess(action, state);
    case actionTypes.UPDATE_GET_CARTS_DATA_FAIL:
      return cartsFail(action, state);
    case actionTypes.UPDATE_ADD_CARTS:
      return addCartSuccess(action, state);
    case actionTypes.UPDATE_ADD_CARTS_DATA_FAIL:
      return addCartFail(action, state);
    case actionTypes.UPDATE_COURSE_DETAIL:
      return courseDetailSuccess(action, state);
    case actionTypes.UPDATE_COURSE_DETAIL_DATA_FAIL:
      return courseDetailFail(action, state);
    case actionTypes.UPDATE_GET_WISHLIST:
      return wishListSuccess(action, state);
    case actionTypes.UPDATE_GET_WISHLIST_DATA_FAIL:
      return wishListFail(action, state);
    case actionTypes.UPDATE_ADD_WISHLIST:
      return addWishSuccess(action, state);
    case actionTypes.UPDATE_ADD_WISHLIST_DATA_FAIL:
      return addWishFail(action, state);
    case actionTypes.UPDATE_DELETE_WISHLIST:
      return deleteWishSuccess(action, state);
    case actionTypes.UPDATE_DELETE_WISHLIST_DATA_FAIL:
      return deleteWishFail(action, state);
    case actionTypes.REMOVE_ERROR:
      return RemoveError(action, state);
    default:
      return state;
  }
};

export default UserReducer;
