import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import actionHandlers from './actionHandlers';
import styles from './styles.scss';

createCustomElement('example-agent-assist', {
	renderer: {type: snabbdom},
	view,
	styles,
	setInitialState() {
		return {
			searchString: null,
			isLoading: false,
			result: []
		};
	},
	properties: {
		fields: {
			default: {
				short_description: {
					displayValue: 'email',
					value: 'email',
					visible: true
				}
			}
		}
	},
	actionHandlers
});
