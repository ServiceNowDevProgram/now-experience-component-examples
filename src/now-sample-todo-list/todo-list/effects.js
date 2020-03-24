import {createHttpEffect} from '@servicenow/ui-effect-http';
import { createGraphQLEffect } from '@servicenow/ui-effect-graphql';

import {
    FETCH_TODO_SUCCESS,
    FETCH_TODO_ERROR,
    
    CREATE_TODO_SUCCESS,
    CREATE_TODO_ERROR,
    
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_ERROR,

    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR,

    URL_FETCH_TO_DOS,
    URL_CREATE_TO_DO,
    URL_UPDATE_TO_DO,
    URL_DELETE_TO_DO,

    CURRENT_USER_GRAPH_QL_QUERY
} from '../constants';

export const fetchToDosEffect = createHttpEffect(URL_FETCH_TO_DOS, {
    method: 'GET',
    queryParams: ['sysparm_fields', 'sysparm_query', 'sysparm_exclude_reference_link'],
    errorActionType: FETCH_TODO_ERROR,
    successActionType: FETCH_TODO_SUCCESS
});

export const createToDoEffect = createHttpEffect(URL_CREATE_TO_DO, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json'
     },
     dataParam: 'data',
     successActionType: CREATE_TODO_SUCCESS,
     errorActionType: CREATE_TODO_ERROR
});

export const updateToDoEffect = createHttpEffect(URL_UPDATE_TO_DO, {
     method: 'PUT',
     headers: {
        'Content-Type': 'application/json'
     },
     dataParam: 'data',
     pathParams: ['id'],
     successActionType: UPDATE_TODO_SUCCESS,
     errorActionType: UPDATE_TODO_ERROR
});

export const deleteToDoEffect = createHttpEffect(URL_DELETE_TO_DO, {
    method: 'DELETE',
    pathParams: ['id'],
    successActionType: DELETE_TODO_SUCCESS,
    errorActionType: DELETE_TODO_ERROR
});

export const getCurrentUserEffect = createGraphQLEffect(CURRENT_USER_GRAPH_QL_QUERY, {
    successActionType: 'USER_FETCH_SUCCESS',
	errorActionType: 'USER_FETCH_ERROR'
});