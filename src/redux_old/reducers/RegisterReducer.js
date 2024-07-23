import * as actionTypes from "../_ActionsType"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null,
    restaurant: null,
    
}

const registerUpdate=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload,
        error:null
    })
}

const registerFail=(action,state)=>{
    return updateObject(state,{
        isAuthenticated: false,
        data:null,
        restaurant: null,
        error:action.payload    
    })
}



const register2Update=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        restaurant:action.payload.data,
        error:null
    })
}

const RemoveError = (action, state) => {
    return updateObject(state,{
        isAuthenticated:false,
        data:null,
        error:null,
        emailVerify: null
    })
}

const RegisterReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.UPDATE_REGISTER:return registerUpdate(action,state);
        case actionTypes.UPDATE_REGISTER_DATA_FAIL:return registerFail(action,state);
        case actionTypes.UPDATE_REGISTER_INSTRUCTOR:return registerUpdate(action,state);
        case actionTypes.UPDATE_REGISTER_INSTRUCTOR_DATA_FAIL:return registerFail(action,state);
        case actionTypes.REMOVE_ERROR: return RemoveError(action, state)
        default:
            return state
    }
}

export default RegisterReducer