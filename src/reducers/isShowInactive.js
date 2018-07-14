import * as types from './../constants/ActionTypes'

let initialState = true;

let myReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SET_SHOW_INACTIVE:
            return action.value;
        default:
            return state;
    }
};

export default myReducer;