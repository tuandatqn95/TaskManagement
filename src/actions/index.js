import * as types from './../constants/ActionTypes'

export const listAllTask = () => {
    return {
        type: types.LIST_ALL
    }
}

export const submitTask = (task) => {
    return {
        type: types.SUBMIT_TASK,
        task
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task
    }
}

export const searchTask = (searchQuery) => {
    return {
        type: types.SET_SEARCH_KEYWORD,
        searchQuery
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const setShowInactive = (value) => {
    return {
        type: types.SET_SHOW_INACTIVE,
        value
    }
}

export const toggleStatus = (id) => {
    return {
        type: types.TOGGLE_STATUS,
        id
    }
}