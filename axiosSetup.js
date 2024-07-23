import axios from 'axios';
import {BASE_API} from './src/services/API_URI';
import {store} from './src/redux/store';
import RoutePaths from './src/util/RoutePaths';
import {logout} from './src/redux/slices/userSlices';

axios.defaults.baseURL = BASE_API;

axios.interceptors.request.use(async config => {
  try {
    const userToken = store.getState()?.user?.token;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  } catch (e) {
    throw e;
  }

  return config;
});

axios.interceptors.response.use(
  response => {
    if (
      response?.data &&
      (response?.data?.success || response?.data?.status) &&
      (response?.data?.status === 200 ||
        response?.data?.status === 'Success' ||
        response.status === 200)
    ) {
      return response;
    } else {
      if (response.status === 200) {
        if (response?.data?.success === false) {
          throw {
            response,
          };
        }
        return response;
      } else {
        throw {
          response,
        };
      }
    }
  },
  error => {
    if (error?.response?.status === 401) {
      try {
        store.dispatch(logout());
        global.navigationRef.navigate(RoutePaths.login);
      } catch (err) {
        console.log('[response - Error] Error : ', err?.message);
      }
    }
    throw error;
  },
);

export default axios;
