import {actionTypes} from '@servicenow/ui-core';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import {
	KB_KNOWLEDGE_REST_URL,
	KB_KNOWLEDGE_FETCH_REQUESTED,
	KB_KNOWLEDGE_FETCH_STARTED,
	KB_KNOWLEDGE_FETCH_SUCCESS,
	KB_KNOWLEDGE_FETCH_FAILED,
	SEARCH_REQUESTED,
	KB_KNOWLEDGE_TABLE,
	NUMBER_OF_RECORDS_FETCH
} from '../constants';

const triggerSearch = (fields, {dispatch, updateState}) => {
	const searchString =
		fields && fields.short_description && fields.short_description.value
			? fields.short_description.value.trim()
			: '';

	if (searchString) {
		dispatch(SEARCH_REQUESTED, {searchString});
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
		triggerSearch(fields, {dispatch, updateState});
	},
	[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({
		dispatch,
		updateState,
		action
	}) => {
		const {
			payload: {value: fields}
		} = action;
		triggerSearch(fields, {dispatch, updateState});
	},
	[SEARCH_REQUESTED]: ({dispatch, updateState, action}) => {
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
	[KB_KNOWLEDGE_FETCH_REQUESTED]: createHttpEffect(KB_KNOWLEDGE_REST_URL, {
		pathParams: ['table'],
		queryParams: ['sysparm_query', 'sysparm_limit'],
		startActionType: KB_KNOWLEDGE_FETCH_STARTED,
		successActionType: KB_KNOWLEDGE_FETCH_SUCCESS,
		errorActionType: KB_KNOWLEDGE_FETCH_FAILED
	}),
	[KB_KNOWLEDGE_FETCH_STARTED]: ({updateState}) => {
		updateState({isLoading: true});
	},
	[KB_KNOWLEDGE_FETCH_SUCCESS]: ({action, updateState}) => {
		const {
			payload: {result = []}
		} = action;
		updateState({
			isLoading: false,
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
		console.error(`[${type}] ${statusText}: ${message}!`); // eslint-disable-line no-console
		updateState({isLoading: false, result: []});
	}
};
