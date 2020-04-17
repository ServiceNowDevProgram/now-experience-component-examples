import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from './styles.scss';
import actionHandlers from './actionHandlers';
import {TRUE, FALSE, TAG_NOW_SAMPLE_TO_DO_LIST} from '../constants';

createCustomElement(TAG_NOW_SAMPLE_TO_DO_LIST, {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers,
	initialState: {
		todoList: [],
		todoInputValue: '',
		showingCompletedItems: false,
		showProgress: false,
		progressMessage: '',
		modal: null,
		alert: null
	},
	properties: {
		activeToDos: {
			computed({todoList}) {
				return todoList.filter(todo => todo.active === TRUE);
			}
		},
		completedToDos: {
			computed({todoList}) {
				return todoList.filter(todo => todo.active === FALSE);
			}
		}
	}
});
