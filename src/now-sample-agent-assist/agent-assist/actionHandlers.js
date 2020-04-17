import {actionTypes} from '@servicenow/ui-core';
import {fetchKBKnowledge} from './fetchKBKnowledge';
import {
	KB_KNOWLEDGE_FETCH_REQUESTED,
	KB_KNOWLEDGE_FETCH_STARTED,
	KB_KNOWLEDGE_FETCH_SUCCESS,
	KB_KNOWLEDGE_FETCH_FAILED,
	SEARCH_FETCH_COMPLETED,
	SEARCH_FETCH_IN_PROGRESS,
	REFRESH_SEARCH,
	KB_KNOWLEDGE_TABLE,
	NUMBER_OF_RECORDS_FETCH
} from '../constants';

const searchStringUpdateHandler = (fields, {dispatch, updateState}) => {
	const searchString =
		fields && fields.short_description && fields.short_description.value
			? fields.short_description.value.trim()
			: '';

	if (searchString) {
		dispatch(REFRESH_SEARCH, {searchString});
	} else {
		updateState({
			searchString,
			result: []
		});
	}
};

export default {
	[actionTypes.COMPONENT_BOOTSTRAPPED]: ({
		dispatch,
		updateState,
		properties: {fields}
	}) => {
		searchStringUpdateHandler(fields, {dispatch, updateState});
	},
	[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({
		dispatch,
		updateState,
		action
	}) => {
		const {
			payload: {value: fields}
		} = action;
		searchStringUpdateHandler(fields, {dispatch, updateState});
	},
	[REFRESH_SEARCH]: ({dispatch, updateState, action}) => {
		const {
			payload: {searchString}
		} = action;
		const sysparm_query = `short_descriptionLIKE${searchString}^ORtextLIKE${searchString}`;

		updateState({searchString});
		dispatch(KB_KNOWLEDGE_FETCH_REQUESTED, {
			table: KB_KNOWLEDGE_TABLE,
			sysparm_query,
			sysparm_limit: NUMBER_OF_RECORDS_FETCH
		});
	},
	[KB_KNOWLEDGE_FETCH_REQUESTED]: fetchKBKnowledge,
	[KB_KNOWLEDGE_FETCH_STARTED]: ({updateState}) => {
		updateState({status: SEARCH_FETCH_IN_PROGRESS});
	},
	[KB_KNOWLEDGE_FETCH_SUCCESS]: ({action, updateState}) => {
		const {
			payload: {result = []}
		} = action;
		updateState({
			status: SEARCH_FETCH_COMPLETED,
			result
		});
	},
	[KB_KNOWLEDGE_FETCH_FAILED]: ({action, updateState}) => {
		const {
			type,
			payload: {
				statusText,
				data: {
					error: {message}
				}
			}
		} = action;
		console.error(`[${type}] ${statusText}: ${message}!`);
		updateState({status: SEARCH_FETCH_COMPLETED, result: []});
	}
};
