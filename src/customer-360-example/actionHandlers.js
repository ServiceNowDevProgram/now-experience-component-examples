import {actionTypes} from '@servicenow/ui-core';
import {getHttpEffect} from './getHttpEffect';
import {
	INCIDENT_FETCH_REQUESTED,
	INCIDENT_FETCH_SUCCEEDED,
	INCIDENT_FETCH_FAILED,
	USER_FETCH_REQUESTED,
	USER_FETCH_SUCCEEDED,
	USER_FETCH_FAILED,
	INCIDENT_TABLE,
	FETCH_COMPANY,
	FETCH_LOCATION,
	COMPANY_FETCH_SUCCEEDED,
	LOCATION_FETCH_SUCCEEDED,
	LOCATION_TABLE,
	COMPANY_TABLE,
	USER_TABLE,
	OPEN_USER_DETAILS,
	PREVIEW_RECORD
} from './constants';

export default {
	[actionTypes.COMPONENT_BOOTSTRAPPED]: ({
		dispatch,
		updateState,
		properties
	}) => {
		const {table, sysid} = properties;

		if (table === INCIDENT_TABLE && sysid) {
			updateState({isLoading: true});
			dispatch(INCIDENT_FETCH_REQUESTED, {sysId: sysid, table});
		}
	},
	[INCIDENT_FETCH_REQUESTED]: getHttpEffect({
		successActionType: INCIDENT_FETCH_SUCCEEDED,
		errorActionType: INCIDENT_FETCH_FAILED
	}),
	[INCIDENT_FETCH_SUCCEEDED]: ({dispatch, action, updateState}) => {
		const {
			payload: {result}
		} = action;

		if (result && result.caller_id && result.caller_id.value) {
			dispatch(USER_FETCH_REQUESTED, {
				sysId: result.caller_id.value,
				table: USER_TABLE
			});
		} else {
			updateState({isLoading: false});
		}
	},
	[USER_FETCH_REQUESTED]: getHttpEffect({
		successActionType: USER_FETCH_SUCCEEDED,
		errorActionType: USER_FETCH_FAILED
	}),
	[USER_FETCH_SUCCEEDED]: ({action, dispatch, updateState}) => {
		const {
			payload: {result}
		} = action;

		if (!result) {
			updateState({isLoading: false});
		} else {
			const location = result.location && result.location.value;
			if (location)
				dispatch(FETCH_LOCATION, {sysId: location, table: LOCATION_TABLE});

			const company = result.company && result.company.value;
			if (company)
				dispatch(FETCH_COMPANY, {sysId: company, table: COMPANY_TABLE});

			updateState({
				userResult: result,
				isLoading: false
			});
		}
	},
	[FETCH_LOCATION]: getHttpEffect({
		successActionType: LOCATION_FETCH_SUCCEEDED
	}),
	[FETCH_COMPANY]: getHttpEffect({
		successActionType: COMPANY_FETCH_SUCCEEDED
	}),
	[COMPANY_FETCH_SUCCEEDED]: ({updateState, action}) => {
		const {
			payload: {result}
		} = action;

		if (result) updateState({companyResult: result});
	},
	[LOCATION_FETCH_SUCCEEDED]: ({updateState, action}) => {
		const {
			payload: {result}
		} = action;

		if (result) updateState({locationResult: result});
	},
	[INCIDENT_FETCH_FAILED]: ({updateState}) => updateState({isLoading: false}),
	[USER_FETCH_FAILED]: ({updateState}) => updateState({isLoading: false}),
	[OPEN_USER_DETAILS]: ({state, dispatch}) => {
		const {
			userResult: {sys_id}
		} = state;

		dispatch(PREVIEW_RECORD, {
			table: USER_TABLE,
			sys_id
		});
	}
};
