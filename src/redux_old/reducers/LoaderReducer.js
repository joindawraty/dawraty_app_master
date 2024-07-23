import * as actionTypes from "../_ActionsType"
import {updateObject} from "./utility"

const initialState={
    loader: false
}

const hideLoader = (action, state) => {
    return updateObject(state,{
        loader: false
    })
}

const showLoader = (action, state) => {
    return updateObject(state,{
        loader: true
    })
}


const LoaderReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.HIDE_LOADER:return hideLoader(action,state);
        case actionTypes.REMOVE_ERROR:return hideLoader(action,state);
        case actionTypes.SHOW_LOADER:return showLoader(action,state);

        default:
            return state
    }
}

export default LoaderReducer