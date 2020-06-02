import {actionTypes} from '@servicenow/ui-core';
import {fetchToDosEffect, getCurrentUserEffect} from '../effects';

import {
	USER_FETCH_REQUESTED,
	USER_FETCH_SUCCESS,
	USER_FETCH_ERROR,
	FETCH_TODO_REQUESTED,
	FETCH_TODO_SUCCESS,
	FETCH_TODO_ERROR,
	MESSAGE_LOADING_TO_DOS,
	MESSAGE_FETCH_FAILED,
	MEESSAGE_TODO_LIST_EMPTY,
	ALERT_TYPE_INFO,
	ALERT_TYPE_ERROR
} from '../../constants';

export default {
	[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch, updateState}) => {
		updateState({
			showProgress: true,
			progressMessage: MESSAGE_LOADING_TO_DOS
		});
		dispatch(USER_FETCH_REQUESTED);
	},

	[FETCH_TODO_REQUESTED]: fetchToDosEffect,

	[FETCH_TODO_SUCCESS]: coeffects => {
		const {
			action: {
				payload: {result: todoList}
			},
			updateState,
			dispatch
		} = coeffects;
		let alert = null;
		if (todoList) {
			if (todoList.length === 0) {
				alert = {content: MEESSAGE_TODO_LIST_EMPTY, type: ALERT_TYPE_INFO};
			}
			updateState({todoList, showProgress: false, alert});
		} else {
			dispatch(FETCH_TODO_ERROR);
		}
	},

	[FETCH_TODO_ERROR]: ({updateState}) => {
		const alert = {content: MESSAGE_FETCH_FAILED, type: ALERT_TYPE_ERROR};
		updateState({showProgress: false, alert});
	},

	[USER_FETCH_REQUESTED]: getCurrentUserEffect,

	[USER_FETCH_SUCCESS]: ({
		action: {
			payload: {result = {}}
		},
		dispatch,
		updateState
	}) => {
		const {user_sys_id: userSysId} = result;
		if (userSysId) {
			updateState({userSysId});
			dispatch(FETCH_TODO_REQUESTED, {
				sysparm_fields: 'sys_id,short_description,active,assigned_to',
				sysparm_query: `assigned_to=${userSysId}^ORDERBYsys_created_on`,
				sysparm_exclude_reference_link: true
			});
		} else {
			dispatch(USER_FETCH_ERROR);
		}
	},

	[USER_FETCH_ERROR]: ({updateState}) => {
		const alert = {content: MESSAGE_FETCH_FAILED, type: ALERT_TYPE_ERROR};
		updateState({showProgress: false, alert});
	}
};
