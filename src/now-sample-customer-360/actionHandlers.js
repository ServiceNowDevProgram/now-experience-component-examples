import {actionTypes} from '@servicenow/ui-core';
import {getHttpEffect} from './getHttpEffect';
import {
	INCIDENT_FETCH_REQUESTED,
	INCIDENT_FETCH_SUCCESS,
	INCIDENT_FETCH_ERROR,
	LOADED_SUCCESSFULLY,
	USER_FETCH_REQUESTED,
	USER_FETCH_SUCCESS,
	USER_FETCH_ERROR,
	INCIDENT_TABLE,
	PARAM_TABLE_ERROR,
	NO_DATA_AVAILABLE,
	COMPANY_FETCH,
	LOCATION_FETCH,
	COMPANY_FETCH_SUCCESS,
	LOCATION_FETCH_SUCCESS,
	LOCATION_TABLE,
	COMPANY_TABLE,
	USER_TABLE,
	OPEN_USER_DETAILS,
	PREVIEW_RECORD
} from './constants';

export default {
	[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch, updateState, state}) => {
		const {
			properties: {table, sysid}
		} = state;

		if (table === INCIDENT_TABLE && sysid) {
			dispatch(INCIDENT_FETCH_REQUESTED, {sysId: sysid, table});
		} else {
			updateState({
				status: NO_DATA_AVAILABLE,
				reason: PARAM_TABLE_ERROR
			});
		}
	},
	[INCIDENT_FETCH_REQUESTED]: getHttpEffect({
		successActionType: INCIDENT_FETCH_SUCCESS,
		errorActionType: INCIDENT_FETCH_ERROR
	}),
	[INCIDENT_FETCH_SUCCESS]: ({updateState, dispatch, action}) => {
		const {
			payload: {result}
		} = action;

		if (result && result.caller_id && result.caller_id.value) {
			dispatch(USER_FETCH_REQUESTED, {
				sysId: result.caller_id.value,
				table: USER_TABLE
			});
		} else {
			updateState({
				status: NO_DATA_AVAILABLE,
				reason: INCIDENT_FETCH_ERROR
			});
		}
	},

	[USER_FETCH_REQUESTED]: getHttpEffect({
		successActionType: USER_FETCH_SUCCESS,
		errorActionType: USER_FETCH_ERROR
	}),

	[USER_FETCH_SUCCESS]: coeffects => {
		const {
			action: {
				payload: {result}
			},
			dispatch,
			updateState
		} = coeffects;

		if (!result) {
			updateState({
				status: NO_DATA_AVAILABLE,
				reason: USER_FETCH_ERROR
			});
		} else {
			const location = result.location && result.location.value;
			if (location)
				dispatch(LOCATION_FETCH, {sysId: location, table: LOCATION_TABLE});

			const company = result.company && result.company.value;
			if (company)
				dispatch(COMPANY_FETCH, {sysId: company, table: COMPANY_TABLE});

			updateState({
				userResult: result,
				status: LOADED_SUCCESSFULLY
			});
		}
	},
	[LOCATION_FETCH]: getHttpEffect({
		successActionType: LOCATION_FETCH_SUCCESS
	}),

	[COMPANY_FETCH]: getHttpEffect({
		successActionType: COMPANY_FETCH_SUCCESS
	}),
	[COMPANY_FETCH_SUCCESS]: ({updateState, action}) => {
		const {
			payload: {result}
		} = action;
		if (result) updateState({companyResult: result});
	},
	[LOCATION_FETCH_SUCCESS]: ({updateState, action}) => {
		const {
			payload: {result}
		} = action;

		if (result) updateState({locationResult: result});
	},
	[INCIDENT_FETCH_ERROR]: ({updateState}) => {
		updateState({
			status: NO_DATA_AVAILABLE,
			reason: INCIDENT_FETCH_ERROR
		});
	},
	[USER_FETCH_ERROR]: ({updateState}) => {
		updateState({
			status: NO_DATA_AVAILABLE,
			reason: USER_FETCH_ERROR
		});
	},
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
