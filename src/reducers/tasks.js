import * as types from './../constants/ActionTypes'



let storeData = (tasks) => {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

var pullData = () => {
    if (typeof (Storage) !== "undefined") {
        try {
            return JSON.parse(localStorage.tasks)
        } catch (e) {
            console.log(e + '');
            return [];
        }
    }
    return [];
}
let initialState = pullData();

let myReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SUBMIT_TASK:
            if (action.task.id) {
                let task = state.find(t => t.id === action.task.id);
                task.taskName = action.task.taskName;
                task.status = action.task.status;
            } else {
                let newTask = {
                    id: Date.now().toString(),
                    taskName: action.task.taskName,
                    status: action.task.status
                }
                state.push(newTask)
            }

            storeData([...state]);
            return [...state];

        case types.DELETE_TASK:
            state = state.filter(task => task.id !== action.id)
            return [...state]

        case types.TOGGLE_STATUS:
            let task = state.find(_task => _task.id === action.id);
            task.status = !task.status;
            storeData([...state]);
            return [...state]

        default:
            return state;
    }
};

export default myReducer;