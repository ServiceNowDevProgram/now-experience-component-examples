import {createHttpEffect} from '@servicenow/ui-effect-http';

export const getHttpEffect = ({successActionType, errorActionType}) => {
	return createHttpEffect('/api/now/table/:table/:sysId', {
		pathParams: ['sysId', 'table'],
		successActionType,
		errorActionType
	});
};
