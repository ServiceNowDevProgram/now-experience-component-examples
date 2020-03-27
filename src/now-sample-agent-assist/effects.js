import {createHttpEffect} from '@servicenow/ui-effect-http';
import { 
    KB_KNOWLEDGE_REST_IRL,
    KB_KNOWLEDGE_FETCH_SUCCESS,
    KB_KNOWLEDGE_FETCH_ERROR,
    HTTP_GET_METHOD,
    TABLE,
    SYS_PARAM_QUERY,
    SYS_PARAM_LIMIT
} from './constants';



export const fetchKBKnowledge = createHttpEffect(KB_KNOWLEDGE_REST_IRL, {
    method: HTTP_GET_METHOD,
    headers: {
        'Content-Type': 'application/json'
    },
    pathParams: [TABLE],
    queryParams : ['sysparm_query' , 'sysparm_limit'],
    successActionType: KB_KNOWLEDGE_FETCH_SUCCESS,
    errorActionType: KB_KNOWLEDGE_FETCH_ERROR
});