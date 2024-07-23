import axios from '../../../axiosSetup';
import {appConstants} from '../../constants';
import {
  FORGOT_OTP_VERIFY,
  FORGOT,
  FORGOT_NEW_PASSWORD,
  LOGIN,
  LOGOUT,
  DELETEME,
  OTP_VERIFY,
  REGISTER_INSTRUCTOR,
  REGISTER_STUDENT,
  NOTIFICATIONS,
  READ_NOTIFICATION,
  USER_PROFILE_UPDATE,
  GET_ADDRESSES,
} from '../API_URI';

// ADD API functions here..

export const login = async loginPayload => {
  return axios.post(LOGIN, loginPayload);
};
export const updateProfile = async payload => {
  return axios.post(USER_PROFILE_UPDATE, payload);
};

export const forgotNewPassword = async payload => {
  return axios.post(FORGOT_NEW_PASSWORD, payload);
};

export const register = async payload => {
  let url = REGISTER_STUDENT;
  if (payload.type === appConstants.Instructor) {
    if (payload?.cv) {
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      payload.cv_file = {
        type: `application/${payload?.cv?.cv_ext}`,
        name: `${new Date().getTime() + getRndInteger(1000, 9999)}.${
          payload?.cv?.cv_ext
        }`,
        uri: payload?.cv?.cv_file,
      };
      payload.cv_ext = payload?.cv?.cv_ext ?? '';
      delete payload?.cv;
    }
    console.log('payload : ', payload);
    url = REGISTER_INSTRUCTOR;
  }
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    formData.append(key, payload[key]);
  });
  return axios.post(url, formData, {
    headers: {
      'application-type': 'multipart/form-data',
    },
  });
};

export const forgotPassword = async payload => {
  return axios.post(FORGOT, payload);
};

export const forgotVerifyOtp = async payload => {
  return axios.post(FORGOT_OTP_VERIFY, payload);
};

export const logout = async () => {
  return axios.post(LOGOUT);
};

export const deleteMe = async () => {
  return axios.delete(DELETEME);
};

export const otpVerify = async payload => {
  return axios.post(OTP_VERIFY, payload);
};

export const getNotifications = async () => {
  return axios.get(NOTIFICATIONS);
};

export const readNotification = async id => {
  return axios.put(READ_NOTIFICATION.replace(':id', id));
};

