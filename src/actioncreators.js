import * as api from './remotedb';
import { getIsFetching } from './todos';
import * as schema from './schema';
import { normalize } from 'normalizr';


export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        });
    });

export const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, schema.todo)
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
                response: normalize(response,schema.arrayOfTodos)
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