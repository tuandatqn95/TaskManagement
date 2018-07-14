import * as types from './../constants/ActionTypes'

let initialState = '';

let myReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SET_SEARCH_KEYWORD:
            return action.searchQuery;
        default:
            return state;
    }
};

export default myReducer;