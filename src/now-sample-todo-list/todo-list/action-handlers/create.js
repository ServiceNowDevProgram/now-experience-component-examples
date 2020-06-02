import {createToDoEffect} from '../effects';

import {
	CREATE_TODO,
	CREATE_TODO_REQUESTED,
	CREATE_TODO_SUCCESS,
	CREATE_TODO_ERROR,
	MESSAGE_ADDING_TO_DO,
	ALERT_TYPE_ERROR,
	MESSAGE_CREATE_FAILED
} from '../../constants';

export default {
	[CREATE_TODO_REQUESTED]: createToDoEffect,

	[CREATE_TODO]: coeffects => {
		const {state, dispatch, updateState} = coeffects;
		updateState({showProgress: true, progressMessage: MESSAGE_ADDING_TO_DO});
		dispatch(CREATE_TODO_REQUESTED, {
			data: {
				short_description: state.todoInputValue,
				assigned_to: state.userSysId
			}
		});
	},

	[CREATE_TODO_SUCCESS]: coeffects => {
		const {
			action: {
				payload: {result}
			},
			state,
			updateState,
			dispatch
		} = coeffects;
		if (result && state && state.todoList) {
			updateState({
				todoList: [result, ...state.todoList],
				todoInputValue: '',
				showProgress: false,
				alert: false
			});
		} else {
			dispatch(CREATE_TODO_ERROR);
		}
	},

	[CREATE_TODO_ERROR]: ({updateState}) => {
		const alert = {content: MESSAGE_CREATE_FAILED, type: ALERT_TYPE_ERROR};
		updateState({showProgress: false, alert});
	}
};
