import * as actionTypes from "../_ActionsType"

export const _Types=(payload)=>({
    type:actionTypes.TYPES_START,
    payload
})

export const TypesUpdate=(payload)=>({
    type:actionTypes.UPDATE_TYPES_DATA_SUCCESS,
    payload:payload
})

export const TypesSuccess=(payload)=>({
    type:actionTypes.TYPES_SUCCESS,
    payload
})

export const TypesFail=(payload)=>({
    type:actionTypes.UPDATE_TYPES_DATA_FAIL,
    payload:payload
})

export const _DishHelpers=(payload)=>({
    type:actionTypes.DISH_HELPER_START,
    payload
})

export const DishHelpersUpdate=(payload)=>({
    type:actionTypes.UPDATE_DISH_HELPER_DATA_SUCCESS,
    payload:payload
})

export const DishHelpersSuccess=(payload)=>({
    type:actionTypes.DISH_HELPER_SUCCESS,
    payload
})

export const DishHelpersFail=(payload)=>({
    type:actionTypes.UPDATE_DISH_HELPER_DATA_FAIL,
    payload:payload
})

export const _AreaAdd=(payload)=>({
    type:actionTypes.ADD_AREA,
    payload
})

export const AreaAddUpdate=(payload)=>({
    type:actionTypes.ADD_AREA_DATA,
    payload:payload
})

export const AreaAddSuccess=(payload)=>({
    type:actionTypes.ADD_AREA_SUCCESS,
    payload
})

export const AreaAddFail=(payload)=>({
    type:actionTypes.ADD_AREA_DATA_FAIL,
    payload:payload
})

export const removeError=()=>({
    type:actionTypes.REMOVE_ERROR
})