import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import '@servicenow/now-avatar';
import '@servicenow/now-label-value';

import styles from './styles.scss';
import view from './view';
import actionHandlers from './actionHandlers';
import {LOADING_DATA} from './constants';

createCustomElement('now-sample-customer-360', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		userResult: null,
		status: LOADING_DATA,
		locationResult: null,
		companyResult: null
	},
	properties: {
		table: {
			default: null
		},
		sysid: {
			default: null
		}
	},
	styles,
	actionHandlers
});
