import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './styles.scss';
import actionHandlers from './action-handlers';
import { TRUE, FALSE } from '../constants';

createCustomElement('sn-todo-list', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers,
	initialState: {
		todoList: [],
		todoInputValue: '',
		showingCompletedItems: false,
		showProgress: false,
		progressMessage: ''
	},
	properties: {
		activeToDos: {
			computed({ todoList }) {
				return todoList.filter(todo => todo.active === TRUE);
			}
		},
		completedToDos: {
			computed({ todoList }) {
				return todoList.filter(todo => todo.active === FALSE);
			}
		}
	}
});
