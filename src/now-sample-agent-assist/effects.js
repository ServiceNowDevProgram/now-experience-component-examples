import {createHttpEffect} from '@servicenow/ui-effect-http';
import { 
    KB_KNOWLEDGE_REST_IRL,
    KB_KNOWLEDGE_FETCH_SUCCESS,
    HTTP_GET_METHOD,
    TABLE,
    NO_KB_KNOWLEDGE_RECORDS,
    SYS_PARAM_QUERY,
    SYS_PARAM_LIMIT
} from './constants';



export const fetchKBKnowledge = createHttpEffect(KB_KNOWLEDGE_REST_IRL, {
    method: HTTP_GET_METHOD,
    headers: {
        'Content-Type': 'application/json'
    },
    pathParams: [TABLE],
    queryParams : [SYS_PARAM_QUERY , SYS_PARAM_LIMIT],
    successActionType: KB_KNOWLEDGE_FETCH_SUCCESS,
    errorActionType: NO_KB_KNOWLEDGE_RECORDS
});