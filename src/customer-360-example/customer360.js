import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-avatar';
import '@servicenow/now-label-value';
import styles from './styles.scss';
import view from './view';
import actionHandlers from './actionHandlers';

createCustomElement('example-customer-360', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		userResult: {},
		isLoading: true,
		locationResult: {},
		companyResult: {}
	},
	properties: {
		table: {
			default: ''
		},
		sysid: {
			default: ''
		}
	},
	styles,
	actionHandlers
});
