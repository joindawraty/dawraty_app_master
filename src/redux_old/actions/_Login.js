import * as actionTypes from "../_ActionsType"

export const _Login=(payload)=>({
    type:actionTypes.LOGIN_START,
    payload
})

export const _SocialLogin=(payload)=>({
    type:actionTypes.SOCIAL_LOGIN_START,
    payload
})

export const LoginUpdate=(payload)=>({
    type:actionTypes.UPDATE_LOGIN_DATA_SUCCESS,
    payload:payload
})

export const LoginSuccess=()=>({
    type:actionTypes.LOGIN_SUCCESS
})

export const LoginFail=(payload)=>({
    type:actionTypes.UPDATE_LOGIN_DATA_FAIL,
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