import { deleteToDoEffect } from '../effects';

import {
    DELETE_TODO,
    DELETE_TODO_CONFIRMED,
    DELETE_TODO_CANCELLED,
    DELETE_TODO_REQUESTED,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR,
    MESSAGE_DELETING_TO_DO,
    MESSAGE_DELETE_TO_DO_MODAL_HEADER,
    MESSAGE_DELETE_TO_DO_MODAL_BODY,
    SHOW_MODAL,
    MESSAGE_DELETE_FAILED,
    ALERT_TYPE_INFO,
    ALERT_TYPE_ERROR,
    MEESSAGE_TODO_LIST_EMPTY
} from '../../constants';

export default {
    [DELETE_TODO_REQUESTED]: deleteToDoEffect,

    [DELETE_TODO]: (coeffects) => {
        const { action: { payload }, dispatch } = coeffects;
        dispatch(SHOW_MODAL, {
            id: payload.id,
            header: MESSAGE_DELETE_TO_DO_MODAL_HEADER,
            body: MESSAGE_DELETE_TO_DO_MODAL_BODY,
            cancelEvent: DELETE_TODO_CANCELLED,
            successEvent: DELETE_TODO_CONFIRMED
        });
    },

    [DELETE_TODO_CONFIRMED]: (coeffects) => {
        const { action: { payload }, state: { todoList }, dispatch, updateState } = coeffects;
        const todoIndex = todoList.findIndex((todo) => todo.sys_id == payload.id);
        todoList.splice(todoIndex, 1);
        updateState({ showProgress: true, progressMessage: MESSAGE_DELETING_TO_DO, todoList: [...todoList], modal: null });
        dispatch(DELETE_TODO_REQUESTED, { id: payload.id });
    },

    [DELETE_TODO_CANCELLED]: ({updateState}) => {
        updateState({modal: null});
    },

    [DELETE_TODO_SUCCESS]: ({ state, updateState }) => {
        const {todoList} = state;
        let alert = null;
        if (todoList.length === 0) {
            alert = {content: MEESSAGE_TODO_LIST_EMPTY, type: ALERT_TYPE_INFO};
        }
        updateState({ showProgress: false, alert });
    },

    [DELETE_TODO_ERROR]: ({ updateState }) => {
        const alert = {content: MESSAGE_DELETE_FAILED, type: ALERT_TYPE_ERROR};
        updateState({ showProgress: false, alert });
    }
};