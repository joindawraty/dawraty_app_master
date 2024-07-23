import * as actionTypes from '../_ActionsType';
import * as API from '../../services/API_URI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const accessToken = AsyncStorage.getItem('accessToken')

export const api =
  ({dispatch}) =>
  next =>
  async action => {
    if (action.type == actionTypes.API_REQUEST) {
      const {method, url, onSuccess, onError, data} = action.meta;
      // console.log("API Params: ",data)
      let user = await AsyncStorage.getItem('userDetail');
      // console.log(user)
      let headers = {};
      if (user != 'null' && user != null) {
        user = JSON.parse(user);

        headers = {
          Authorization: `Bearer ${user.data.token || user.token}`,
        };
      }
      axios({
        url: url,
        method: method,
        baseURL: API.BASE_API,
        headers,
        data: data,
        transformResponse: [
          data => {
            // console.log(data);
          },
        ],
      })
        .then(res => {
          if (res.request) {
            dispatch({
              type: onSuccess,
              payload: JSON.parse(res.request.response),
            });
          }
        })
        .catch(error => {
          if (error.response) {
            dispatch({
              type: onError,
              payload: JSON.parse(error.response.request._response),
            });
          }
        });
    }
    return next(action);
  };

export const apiMiddleware = [api];
