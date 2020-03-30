import {createHttpEffect} from '@servicenow/ui-effect-http';
import { USER_FETCH_SUCCESS, 
        USER_FETCH_ERROR,
        TABLE , 
        SYS_ID , 
        HTTP_GET_METHOD , 
        TABLE_REST_URL, 
        LOCATION_FETCH_SUCCESS , 
        LOCATION_FETCH_ERROR , 
        COMPANY_FETCH_SUCCESS , 
        COMPANY_FETCH_ERROR,
        INCIDENT_FETCH_SUCCESS,
        INCIDENT_FETCH_ERROR

    } from './constants';

export const fetchIncident = createHttpEffect(TABLE_REST_URL, {
    pathParams: [SYS_ID , TABLE],
    successActionType: INCIDENT_FETCH_SUCCESS,
    errorActionType: INCIDENT_FETCH_ERROR
});

export const fetchUser = createHttpEffect(TABLE_REST_URL, {
    method: HTTP_GET_METHOD,
    headers: {
        'Content-Type': 'application/json'
    },
    pathParams: [SYS_ID , TABLE],
    successActionType: USER_FETCH_SUCCESS,
    errorActionType: USER_FETCH_ERROR
});

export const fetchLocation = createHttpEffect(TABLE_REST_URL, {
    method: HTTP_GET_METHOD,
    headers: {
        'Content-Type': 'application/json'
    },
    pathParams: [SYS_ID , TABLE],
    successActionType: LOCATION_FETCH_SUCCESS,
    errorActionType: LOCATION_FETCH_ERROR
});

export const fetchCompany = createHttpEffect(TABLE_REST_URL, {
    method: HTTP_GET_METHOD,
    headers: {
        'Content-Type': 'application/json'
    },
    pathParams: [SYS_ID , TABLE],
    successActionType: COMPANY_FETCH_SUCCESS,
    errorActionType: COMPANY_FETCH_ERROR
});
