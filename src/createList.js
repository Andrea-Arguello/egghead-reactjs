import { combineReducers } from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return filter === action.filter ?
                    action.response.map(todo => todo.id) :
                    state;
            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ?
                    [...state, action.response.id] : state;
            case 'TOGGLE_TODO_SUCCESS':
                return state;
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_REQUEST':
                return true;
            case 'FETCH_SUCCESS':
            case 'FETCH_FAILURE':
                return false;
            default:
                return state;
        }
    };

    const errorMessage = (state = null, action) => {
        if (filter !== action.filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_FAILURE':
                return action.message;
            case 'FETCH_REQUEST':
            case 'FETCH_SUCCESS':
                return null;
            default:
                return state;
        }
    }

    return combineReducers({
        ids,
        isFetching,
        errorMessage
    });
}

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;