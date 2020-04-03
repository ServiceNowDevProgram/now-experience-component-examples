import {actionTypes} from '@servicenow/ui-core';

import {fetchKBKnowledge} from './fetchKBKnowledge';
import {
	KB_KNOWLEDGE_FETCH_REQUESTED,
	KB_KNOWLEDGE_FETCH_SUCCESS,
	FOUND_SEARCH_ITEMS,
	NO_SEARCH_ITEMS,
	SEARCH_FETCH_IN_PROGRESS,
	REFRESH_SEARCH,
	KB_KNOWLEDGE_TABLE,
	NUMBER_OF_RECORDS_FETCH,
	NO_KB_KNOWLEDGE_RECORDS
} from './constants';

const searchStringUpdateHandler = coeffects => {
	const {
		dispatch,
		state: {
			properties: {fields}
		},
		updateState
	} = coeffects;
	let SEARCH_STRING =
		fields != null && fields.short_description && fields.short_description.value
			? fields.short_description.value
			: '';

	if (SEARCH_STRING != '') {
		// If search string is not null then refresh the component...
		SEARCH_STRING = SEARCH_STRING.trim();

		updateState({SEARCH_STRING});
		dispatch(REFRESH_SEARCH, {});
	} else {
		//If search string is empty, Clear the response list...
		updateState({SEARCH_STRING});
		dispatch(NO_KB_KNOWLEDGE_RECORDS, {});
	}
};

export default {
	[KB_KNOWLEDGE_FETCH_REQUESTED]: fetchKBKnowledge,

	[KB_KNOWLEDGE_FETCH_SUCCESS]: coeffects => {
		let {
			action: {
				payload: {result}
			},
			updateState
		} = coeffects;
		if (result != null && result.length > 0) {
			status = FOUND_SEARCH_ITEMS;
		} else {
			status = NO_SEARCH_ITEMS;
			result = [];
		}

		updateState({result, status});
	},

	[NO_KB_KNOWLEDGE_RECORDS]: coeffects => {
		const result = [];
		const status = NO_SEARCH_ITEMS;
		let {updateState} = coeffects;

		updateState({result, status});
	},

	[REFRESH_SEARCH]: coeffects => {
		const {
			dispatch,
			state: {SEARCH_STRING},
			updateState
		} = coeffects;

		const table = KB_KNOWLEDGE_TABLE;

		const status = SEARCH_FETCH_IN_PROGRESS;
		const sysparm_limit = NUMBER_OF_RECORDS_FETCH;
		const sysparm_query = `short_descriptionLIKE${SEARCH_STRING}^ORtextLIKE${SEARCH_STRING}`;

		//Update the state, for Inprogress view...
		updateState({status});

		//Fetch KB_KNOWLEDGE records...
		dispatch(KB_KNOWLEDGE_FETCH_REQUESTED, {
			table,
			sysparm_query,
			sysparm_limit
		}); // pathParams & queryParams can be passed in single object.
	},

	[actionTypes.COMPONENT_BOOTSTRAPPED]: coeffects => {
		searchStringUpdateHandler(coeffects);
	},

	[actionTypes.COMPONENT_PROPERTY_CHANGED]: coeffects => {
		searchStringUpdateHandler(coeffects);
	}
};
