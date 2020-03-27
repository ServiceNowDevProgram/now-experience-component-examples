import { actionTypes } from '@servicenow/ui-core';

import {fetchKBKnowledge} from './effects';
import { 	
			KB_KNOWLEDGE_FETCH_REQUESTED,
			KB_KNOWLEDGE_FETCH_SUCCESS, 
			KB_KNOWLEDGE_FETCH_ERROR,
			UPDATE_STATE,
			FOUND_SEARCH_ITEMS,
			NO_SEARCH_ITEMS,
			ERROR_WHILE_SEARCH,
			SEARCH_FETCH_IN_PROGRESS , 
			REFRESH_SEARCH,
			KB_KNOWLEDGE_TABLE,
			NUMBER_OF_RECORDS_FETCH

} from './constants';

const triggerFetchKBKnowledge = function(dispatch){
	const status = SEARCH_FETCH_IN_PROGRESS;
	
	//Update the state, for Inprogress view...
	dispatch(UPDATE_STATE , {status});

	//Fetch KB_KNOWLEDGE records...
	dispatch(KB_KNOWLEDGE_FETCH_REQUESTED , {});
}

export default {

	[UPDATE_STATE] : (coeffects) => {
		let {state , action : {payload : {status , result }} , updateState} = coeffects;
		updateState({status , result});
	},

    [KB_KNOWLEDGE_FETCH_REQUESTED] : fetchKBKnowledge, 

	[KB_KNOWLEDGE_FETCH_SUCCESS] : (coeffects)=> {
		let {action: { payload: {result} }, dispatch} = coeffects;
		if( result != null && result.length > 0 ){
			status = FOUND_SEARCH_ITEMS;
		}else{
			status = NO_SEARCH_ITEMS;
			result = [];
		} 
		dispatch(UPDATE_STATE , {result, status }); 
	},

	[KB_KNOWLEDGE_FETCH_ERROR] : (coeffects)=> {
		const result = [];
		const status = ERROR_WHILE_SEARCH;
		let {dispatch} = coeffects;
		dispatch(UPDATE_STATE , {result, status }); 
	},

	[REFRESH_SEARCH] : (coeffects) => {
		const {dispatch , action : {payload: {table , sysparm_query }} ,   state : {properties : {fields}} } = coeffects;

		const status = SEARCH_FETCH_IN_PROGRESS;
		const sysparm_limit = NUMBER_OF_RECORDS_FETCH;
	
		//Update the state, for Inprogress view...
		dispatch(UPDATE_STATE , {status});

		//Fetch KB_KNOWLEDGE records...
		dispatch(KB_KNOWLEDGE_FETCH_REQUESTED ,{table , sysparm_query , sysparm_limit} );
	},

	[actionTypes.COMPONENT_BOOTSTRAPPED]: ( coeffects ) => {
		const {dispatch ,  state : {properties : {fields}} } = coeffects;
		const searchString = fields.short_description.value;

		if(searchString != "" && searchString != null){
			let sysparm_query = `short_descriptionLIKE${searchString}^ORtextLIKE${searchString}`;
			let sysparm_limit = NUMBER_OF_RECORDS_FETCH;
			
			dispatch(REFRESH_SEARCH, {table : KB_KNOWLEDGE_TABLE , sysparm_query });
		}	
	}
}