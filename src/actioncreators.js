import * as api from './remotedb';
import { getIsFetching } from './todos';


export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response
        });
    });

export const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response
        });
    });

// async
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_REQUEST',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_SUCCESS',
                filter,
                response
            });
        },
        error => {
            dispatch({
                type: 'FETCH_FAILURE',
                filter,
                message: error.message || 'Something went wrong'
            })
        }
    );
};