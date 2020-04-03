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
	[INCIDENT_FETCH_REQUESTED]: getHttpEffect({
		//Fetch Incident.
		successActionType: INCIDENT_FETCH_SUCCESS,
		errorActionType: INCIDENT_FETCH_ERROR
	}),

	[INCIDENT_FETCH_SUCCESS]: coeffects => {
		//Ftech user when fetch Incident is successfull.
		const {
			action: {
				payload: {result}
			},
			dispatch,
			updateState
		} = coeffects;
		if (
			result != null &&
			result.caller_id != null &&
			result.caller_id.value != null
		) {
			dispatch(USER_FETCH_REQUESTED, {
				sysId: result.caller_id.value,
				table: USER_TABLE
			});
		} else {
			let userResult = null;
			let reason = INCIDENT_FETCH_ERROR;
			let status = NO_DATA_AVAILABLE;

			updateState({status, userResult, reason});
		}
	},

	[USER_FETCH_REQUESTED]: getHttpEffect({
		successActionType: USER_FETCH_SUCCESS,
		errorActionType: USER_FETCH_ERROR
	}), //Fetch User.

	[USER_FETCH_SUCCESS]: coeffects => {
		const {
			action: {
				payload: {result}
			},
			dispatch,
			updateState
		} = coeffects;
		let status = LOADED_SUCCESSFULLY;

		let location = result.location.value;
		if (location != undefined && location != '') {
			//Dispatch action for fetching location.
			dispatch(LOCATION_FETCH, {sysId: location, table: LOCATION_TABLE});
		}

		let company = result.company.value;
		if (company != undefined && company != '') {
			//Dispatch action for fetching company.
			dispatch(COMPANY_FETCH, {sysId: company, table: COMPANY_TABLE});
		}
		const userResult = result;
		updateState({userResult, status});
	},

	[LOCATION_FETCH]: getHttpEffect({
		//Fetch Location.
		successActionType: LOCATION_FETCH_SUCCESS
	}),

	[COMPANY_FETCH]: getHttpEffect({
		//Fetch compaany.
		successActionType: COMPANY_FETCH_SUCCESS
	}),

	[COMPANY_FETCH_SUCCESS]: coeffects => {
		// Update the state when company response came.
		const {
			action: {
				payload: {result}
			},
			updateState
		} = coeffects;
		let companyResult = result;
		updateState({companyResult});
	},

	[LOCATION_FETCH_SUCCESS]: coeffects => {
		//Update the state when location response came.
		const {
			action: {
				payload: {result}
			},
			updateState
		} = coeffects;
		let locationResult = result;

		updateState({locationResult});
	},

	[INCIDENT_FETCH_ERROR]: coeffects => {
		//Show no data available when fetch incident throw error.
		let userResult = null;
		const {updateState} = coeffects;
		let reason = INCIDENT_FETCH_ERROR;
		let status = NO_DATA_AVAILABLE;

		updateState({status, userResult, reason});
	},

	[USER_FETCH_ERROR]: coeffects => {
		//Show no data available when fetch user throw error.
		let userResult = null;
		let status = NO_DATA_AVAILABLE;
		let reason = USER_FETCH_ERROR;

		const {updateState} = coeffects;
		updateState({userResult, status, reason});
	},

	[OPEN_USER_DETAILS]: coeffects => {
		const {
			dispatch,
			state: {
				userResult: {sys_id}
			}
		} = coeffects;
		const table = USER_TABLE;
		dispatch(PREVIEW_RECORD, {table, sys_id});
	},

	[actionTypes.COMPONENT_BOOTSTRAPPED]: coeffects => {
		const {
			dispatch,
			updateState,
			state: {
				properties: {table, sysid}
			}
		} = coeffects;

		let sysId = sysid;
		if (table == INCIDENT_TABLE && sysId != null) {
			dispatch(INCIDENT_FETCH_REQUESTED, {sysId, table});
		} else {
			//If the table is not "[INCIDENT_TABLE]", Show the message "No data available..."
			let userResult = null;
			let reason = PARAM_TABLE_ERROR;
			let status = NO_DATA_AVAILABLE;
			updateState({userResult, status, reason});
		}
	}
};
