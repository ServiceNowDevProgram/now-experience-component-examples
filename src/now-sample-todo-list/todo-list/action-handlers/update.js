import {updateToDoEffect} from '../effects';

import {
	UPDATE_TODO,
	UPDATE_TODO_REQUESTED,
	UPDATE_TODO_ERROR,
	ALERT_TYPE_ERROR,
	MESSAGE_UPDATE_FAILED
} from '../../constants';

export default {
	[UPDATE_TODO_REQUESTED]: updateToDoEffect,

	[UPDATE_TODO]: coeffects => {
		const {
			action: {payload},
			dispatch,
			state: {todoList},
			updateState
		} = coeffects;
		const todo = todoList.find(todo => todo.sys_id === payload.id);
		todo.active = '' + payload.active;
		updateState({todoList: [...todoList]});
		dispatch(UPDATE_TODO_REQUESTED, {
			data: {active: payload.active},
			id: payload.id
		});
	},

	[UPDATE_TODO_ERROR]: ({updateState}) => {
		const alert = {content: MESSAGE_UPDATE_FAILED, type: ALERT_TYPE_ERROR};
		updateState({showProgress: false, alert});
	}
};
