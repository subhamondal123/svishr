import { combineReducers } from "redux";

const INITIAL_STATE = {
    loginData: {},
    stateLookupData:{}
};

const SvishrReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_LOGIN_DATA":
            state.loginData = action.payload
            return state;
        case "SET_LOOKUP":
            state.stateLookupData = action.payload;
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    SvishrRedux: SvishrReducer
})