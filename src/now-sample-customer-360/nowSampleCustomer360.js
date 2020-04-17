import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import '@servicenow/now-avatar';
import '@servicenow/now-label-value';

import styles from './styles.scss';
import view from './view';
import actionHandlers from './actionHandlers';
import {LOADING_DATA, TAG_CUSTOMER_360} from './constants';

createCustomElement(TAG_CUSTOMER_360, {
	renderer: {type: snabbdom},
	view,
	initialState: {
		userResult: {},
		status: LOADING_DATA,
		locationResult: {},
		companyResult: {}
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
