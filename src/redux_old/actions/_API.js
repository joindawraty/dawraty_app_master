import * as actionTypes from "../_ActionsType"

export const apiRequest = (method, url, body, onSuccess, onError,data) => ({
    type: actionTypes.API_REQUEST,
    payload: body,
    meta: { method, url, onSuccess, onError,data }
  });
  
  