import {createHttpEffect} from '@servicenow/ui-effect-http';
import {TABLE, SYS_ID, HTTP_GET_METHOD, TABLE_REST_URL} from './constants';

export const getHttpEffect = ({successActionType, errorActionType}) => {
	return createHttpEffect(TABLE_REST_URL, {
		method: HTTP_GET_METHOD,
		headers: {
			'Content-Type': 'application/json'
		},
		pathParams: [SYS_ID, TABLE],
		successActionType,
		errorActionType
	});
};
