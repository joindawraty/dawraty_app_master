import * as actionTypes from "../_ActionsType"


export const showLoader=()=>({
    type:actionTypes.SHOW_LOADER
})

export const hideLoader=()=>({
    type:actionTypes.HIDE_LOADER
})

export const removeError=() =>({
    type: actionTypes.REMOVE_ERROR
})
