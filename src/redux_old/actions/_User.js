import * as actionTypes from "../_ActionsType"

export const _User=(payload)=>({
    type:actionTypes.USER_DETAIL,
    payload:payload
})

export const _GetUser = (payload) => ({
    type: actionTypes.GET_USER_DETAIL,
    payload: payload
})


export const _UpdateUser = (payload) => ({
    type: actionTypes.UPDATE_USER_DETAIL,
    payload: payload
})

export const UserUpdate=(payload)=>({
    type:actionTypes.UPDATE_USER_DATA_SUCCESS,
    payload:payload
})

export const UserSuccess=()=>({
    type:actionTypes.USER_SUCCESS
})

export const UserFail=(payload)=>({
    type:actionTypes.UPDATE_USER_DATA_FAIL,
    payload:payload
})

export const _UpdatePassword = (payload) => ({
    type: actionTypes.UPDATE_USER_PASSWORD,
    payload: payload
})

export const UserPasswordSuccess=()=>({
    type:actionTypes.USER_PASSWORD_SUCCESS
})

export const UserPasswordFail=(payload)=>({
    type:actionTypes.UPDATE_USER_PASSWORD_FAIL,
    payload:payload
})


export const LogoutStart=()=>({
    type:actionTypes.LOGOUT_START
})

export const LogoutSuccess=()=>({
    type:actionTypes.LOGOUT_SUCCESS
})

export const LogoutFail = ()=>({
    type:actionTypes.LOGOUT_FAIL
})

export const removeAccess=()=>({
    type:actionTypes.REMOVE_ACCESS_TOKEN
})

export const selectRestaurant=(payload)=>({
    type:actionTypes.SELECT_RESTAURANT,
    payload
})

export const updateStatusStart=(payload)=>({
    type:actionTypes.UPDATE_STATUS_START,
    payload
})

export const updateStatusSuccess=(payload)=>({
    type:actionTypes.UPDATE_STATUS_DATA_SUCCESS,
    payload
})

export const updateStatusFail = (payload)=>({
    type:actionTypes.UPDATE_STATUS_DATA_FAIL, 
    payload
})