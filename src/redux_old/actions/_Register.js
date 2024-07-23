import * as actionTypes from "../_ActionsType"

export const _Register=(payload)=>({
    type:actionTypes.REGISTER_START,
    payload:payload
})

export const RegisterSuccess=(payload)=>({
    type:actionTypes.REGISTER_SUCCESS,
    payload
})

export const RegisterUpdate=(payload)=>({
    type:actionTypes.UPDATE_REGISTER,
    payload
})

export const RegisterFail=(payload)=>({
    type:actionTypes.REGISTER_FAIL,
    payload:payload
})

export const RegisterFailUpdate=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_DATA_FAIL,
    payload:payload
})

export const _RegisterStep2=(payload)=>({
    type:actionTypes.REGISTER_STEP_2,
    payload:payload
})

export const RegisterStep2Success=(payload)=>({
    type:actionTypes.REGISTER_STEP_2_SUCCESS,
    payload
})

export const RegisterStep2Update=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_2,
    payload
})

export const RegisterStep2Fail=(payload)=>({
    type:actionTypes.REGISTER_STEP_2_FAIL,
    payload:payload
})

export const RegisterStep2FailUpdate=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_2_DATA_FAIL,
    payload:payload
})

export const _RegisterStep3=(payload)=>({
    type:actionTypes.REGISTER_STEP_3,
    payload:payload
})

export const RegisterStep3Success=(payload)=>({
    type:actionTypes.REGISTER_STEP_3_SUCCESS,
    payload
})

export const RegisterStep3Update=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_3,
    payload
})

export const RegisterStep3Fail=(payload)=>({
    type:actionTypes.REGISTER_STEP_3_FAIL,
    payload:payload
})

export const RegisterStep3FailUpdate=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_3_DATA_FAIL,
    payload:payload
})

export const _RegisterStep4=(payload)=>({
    type:actionTypes.REGISTER_STEP_4,
    payload:payload
})

export const RegisterStep4Success=(payload)=>({
    type:actionTypes.REGISTER_STEP_4_SUCCESS,
    payload
})

export const RegisterStep4Update=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_4,
    payload
})

export const RegisterStep4Fail=(payload)=>({
    type:actionTypes.REGISTER_STEP_4_FAIL,
    payload:payload
})

export const RegisterStep4FailUpdate=(payload)=>({
    type:actionTypes.UPDATE_REGISTER_STEP_4_DATA_FAIL,
    payload:payload
})