import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './listItem.scss';
import actionHandlers from './actionHandlers';

createCustomElement('now-sample-todo-list-item', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers,
	properties: {
		itemCompleted: {},
		itemId: {},
		itemLabel: {}
	}
});
