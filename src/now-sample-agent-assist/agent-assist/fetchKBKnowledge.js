import {createHttpEffect} from '@servicenow/ui-effect-http';
import {
	KB_KNOWLEDGE_REST_URL,
	KB_KNOWLEDGE_FETCH_SUCCESS,
	KB_KNOWLEDGE_FETCH_STARTED,
	HTTP_GET_METHOD,
	TABLE,
	KB_KNOWLEDGE_FETCH_FAILED,
	SYS_PARAM_QUERY,
	SYS_PARAM_LIMIT
} from '../constants';

export const fetchKBKnowledge = createHttpEffect(KB_KNOWLEDGE_REST_URL, {
	method: HTTP_GET_METHOD,
	headers: {
		'Content-Type': 'application/json'
	},
	pathParams: [TABLE],
	queryParams: [SYS_PARAM_QUERY, SYS_PARAM_LIMIT],
	startActionType: KB_KNOWLEDGE_FETCH_STARTED,
	successActionType: KB_KNOWLEDGE_FETCH_SUCCESS,
	errorActionType: KB_KNOWLEDGE_FETCH_FAILED
});
