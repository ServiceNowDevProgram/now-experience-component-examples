import {actionTypes} from '@servicenow/ui-core';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import {
	CHECKLIST_LOAD_SUCCEEDED,
	CHECKLIST_ITEM_ADD,
	CHECKLIST_ITEM_UPDATED,
	URL_CURRENT_USER,
	FETCH_ITEM_REQUESTED,
	URL_TASK_TABLE,
	FETCH_ITEM_SUCCEEDED,
	FETCH_ITEM_FAILED,
	CREATE_ITEM_REQUESTED,
	CREATE_ITEM_SUCCEEDED,
	URL_UPDATE_TASK,
	UPDATE_ITEM_REQUESTED,
	REMOVE_BTN_CLICKED,
	DELETE_ITEM_REQUESTED,
	CHECKLIST_LOAD_STARTED,
	CHECKLIST_LOAD_REQUESTED
} from '../constants';

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch}) => {
			dispatch(CHECKLIST_LOAD_REQUESTED);
		},
		[CHECKLIST_LOAD_REQUESTED]: createHttpEffect(URL_CURRENT_USER, {
			startActionType: CHECKLIST_LOAD_STARTED,
			successActionType: CHECKLIST_LOAD_SUCCEEDED
		}),
		[CHECKLIST_LOAD_STARTED]: ({updateState}) => {
			updateState({isLoading: true});
		},
		[CHECKLIST_LOAD_SUCCEEDED]: ({
			action: {
				payload: {result = {}}
			},
			dispatch,
			updateState
		}) => {
			const {user_sys_id: userSysId} = result;
			if (userSysId) {
				updateState({userSysId});
				dispatch(FETCH_ITEM_REQUESTED, {
					sysparm_fields: 'sys_id,short_description,active,assigned_to',
					sysparm_query: `assigned_to=${userSysId}^ORDERBYDESCsys_created_on`
				});
			} else {
				updateState({isLoading: false});
			}
		},
		[FETCH_ITEM_REQUESTED]: createHttpEffect(URL_TASK_TABLE, {
			queryParams: ['sysparm_fields', 'sysparm_query'],
			errorActionType: FETCH_ITEM_FAILED,
			successActionType: FETCH_ITEM_SUCCEEDED
		}),
		[FETCH_ITEM_SUCCEEDED]: ({action, updateState}) => {
			const {
				payload: {result = []}
			} = action;
			updateState({isLoading: false});
			updateState({
				path: 'items',
				operation: 'concat',
				value: result.map(item => ({
					short_description: item.short_description,
					active: item.active === 'true',
					itemId: item.sys_id
				}))
			});
		},
		[CHECKLIST_ITEM_ADD]: ({action, updateState, dispatch, state}) => {
			const {
				payload: {inputValue}
			} = action;
			const {userSysId} = state;
			updateState({inputValue: ''});
			dispatch(CREATE_ITEM_REQUESTED, {
				data: {
					short_description: inputValue,
					assigned_to: userSysId,
					active: false
				}
			});
		},
		[CREATE_ITEM_REQUESTED]: createHttpEffect(URL_TASK_TABLE, {
			method: 'POST',
			dataParam: 'data',
			successActionType: CREATE_ITEM_SUCCEEDED
		}),
		[CREATE_ITEM_SUCCEEDED]: ({action, updateState}) => {
			const {
				payload: {result}
			} = action;
			updateState({
				path: 'items',
				operation: 'unshift',
				value: {
					short_description: result.short_description,
					active: result.active === 'true',
					itemId: result.sys_id
				}
			});
		},
		[CHECKLIST_ITEM_UPDATED]: ({action, updateState, state, dispatch}) => {
			const {payload} = action;
			updateState({
				items: state.items.map(item =>
					item.itemId === payload.itemId
						? {
							...item,
							...action.payload
						  }
						: {...item}
				)
			});
			dispatch(UPDATE_ITEM_REQUESTED, {
				data: {...payload},
				id: payload.itemId
			});
		},
		[UPDATE_ITEM_REQUESTED]: createHttpEffect(URL_UPDATE_TASK, {
			method: 'PUT',
			dataParam: 'data',
			pathParams: ['id']
		}),
		[REMOVE_BTN_CLICKED]: ({action, updateState, dispatch, state}) => {
			const {
				payload: {itemId}
			} = action;
			updateState({
				items: state.items.filter(item => item.itemId !== itemId)
			});
			dispatch(DELETE_ITEM_REQUESTED, {id: itemId});
		},
		[DELETE_ITEM_REQUESTED]: createHttpEffect(URL_UPDATE_TASK, {
			method: 'DELETE',
			pathParams: ['id']
		})
	}
};
