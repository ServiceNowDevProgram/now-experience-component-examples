export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';

export const FETCH_TODO_REQUESTED = 'FETCH_TODO_REQUESTED';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR';

export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_REQUESTED = 'CREATE_TODO_REQUESTED';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_ERROR = 'CREATE_TODO_ERROR';

export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_TODO_REQUESTED = 'UPDATE_TODO_REQUESTED';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR';

export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_CONFIRMED = 'DELETE_TODO_CONFIRMED';
export const DELETE_TODO_CANCELLED = 'DELETE_TODO_CANCELLED';
export const DELETE_TODO_REQUESTED = 'DELETE_TODO_REQUESTED';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR';

export const CHECKBOX_CLICKED = 'CHECKBOX_CLICKED';
export const NOW_BUTTON_CLICKED = 'NOW_BUTTON#CLICKED';
export const NOW_BUTTON_BARE_CLICKED = 'NOW_BUTTON_BARE#CLICKED';
export const NOW_ALERT_ACTION_CLICKED = 'NOW_ALERT#ACTION_CLICKED';
export const NOW_MODAL_FOOTER_ACTION_CLICKED =
	'NOW_MODAL#FOOTER_ACTION_CLICKED';
export const NOW_MODAL_OPENED_SET = 'NOW_MODAL#OPENED_SET';

export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const CURRENT_USER_ASSIGNMENT = 'javascript:gs.getUserID()';

export const ENTER_KEY_CODE = 13;

export const TRUE = 'true';
export const FALSE = 'false';

export const ALERT_TYPE_INFO = 'info';
export const ALERT_TYPE_ERROR = 'critical';

export const MESSAGE_LOADING_TO_DOS = 'Loading To-Dos...';
export const MESSAGE_ADDING_TO_DO = 'Adding To-Do...';
export const MESSAGE_DELETING_TO_DO = 'Deleting To-Do...';
export const MESSAGE_HIDE_COMPLETED_TO_DOS = 'Hide completed To-Dos';
export const MESSAGE_SHOW_COMPLETED_TO_DOS = 'Show completed To-Dos';
export const MESSAGE_DELETE_TO_DO_MODAL_BODY =
	'You are trying to delete a To-Do. Click Ok to continue.';
export const MESSAGE_DELETE_TO_DO_MODAL_HEADER = 'Deleting To-Do!';

export const MEESSAGE_TODO_LIST_EMPTY = 'There are no To-Dos to display';
export const MESSAGE_FETCH_FAILED = 'Failed to fetch To-Dos. Try again.';
export const MESSAGE_CREATE_FAILED = 'Failed to create To-Do. Try again.';
export const MESSAGE_UPDATE_FAILED = 'Failed to update To-Do. Try again.';
export const MESSAGE_DELETE_FAILED = 'Failed to delete To-Do. Try again.';

export const URL_FETCH_TO_DOS = '/api/now/table/vtb_task';
export const URL_CREATE_TO_DO =
	'/api/now/table/vtb_task?sysparm_exclude_reference_link=true&sysparm_fields=active,sys_id,short_description';
export const URL_UPDATE_TO_DO = '/api/now/table/vtb_task/:id';
export const URL_DELETE_TO_DO = '/api/now/table/vtb_task/:id';

export const TAG_SN_MODAL = 'sn-modal';
export const CANCEL = 'Cancel';
export const OK = 'Ok';

export const TO_DO_LIST = 'To-Do List';
export const ADD_A_TO_DO = 'Add a to-do...';
export const TAG_NOW_SAMPLE_TO_DO_LIST = 'now-sample-todo-list';

export const TAG_NOW_SAMPLE_TODO_LIST_ITEM = 'now-sample-todo-list-item';
export const CURRENT_USER_GRAPH_QL_QUERY = `
query {
    GlideDomain_Query {
        user {
            sys_id
            userName
            firstName
            lastName
            fullName
        }
    }
}`;
