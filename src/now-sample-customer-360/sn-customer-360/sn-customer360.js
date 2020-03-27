import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import '@servicenow/now-avatar';
import '@servicenow/now-label-value';

import styles from './styles.scss';
import view from './view/view';
import actionHandlers from './action-handlers';


createCustomElement('now-customer-360', {
	renderer: {type: snabbdom},
	view,
	properties : {
		table : {
			default: null
		},
		sysid : {
			default: null
		}
	},
	styles,
	actionHandlers
});