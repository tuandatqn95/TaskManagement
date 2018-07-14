import * as types from './../constants/ActionTypes'

let initialState = {
    taskName: '',
    status: true
};

let myReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.EDIT_TASK:
            return action.task;
        default:
            return initialState;
    }
};

export default myReducer;