import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './list-item.scss';
import actionHandlers from './action-handlers';

createCustomElement('sn-todo-list-item', {
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
