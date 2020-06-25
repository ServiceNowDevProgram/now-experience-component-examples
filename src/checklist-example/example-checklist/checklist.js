import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from './checklist.scss';
import checklistActions from './actions';
import rtlBehavior from '@servicenow/behavior-rtl';
import {FILTER} from '../constants';

createCustomElement('example-checklist', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		inputValue: '',
		userSysId: '',
		items: [],
		isLoading: false
	},
	properties: {
		itemsLeft: {
			computed({items = []}) {
				return items.filter(item => !item.active).length;
			}
		},
		filter: {
			default: FILTER.ALL
		}
	},
	...checklistActions,
	styles,
	behaviors: [rtlBehavior]
});
