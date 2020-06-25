import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './checklist-item.scss';
import view from './view';
import checklistItemAction from './actions';

createCustomElement('example-checklist-item', {
	renderer: {type: snabbdom},
	view,
	properties: {
		itemId: {
			default: ''
		},
		label: {
			default: ''
		},
		active: {
			default: false
		},
		editing: {
			default: false
		}
	},
	styles,
	...checklistItemAction
});
