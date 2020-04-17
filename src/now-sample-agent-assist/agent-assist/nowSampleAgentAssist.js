import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {TAG_NOW_SAMPLE_AGENT_ASSIST} from '../constants';

import view from './view';
import actionHandlers from './actionHandlers';
import styles from './styles.scss';

createCustomElement(TAG_NOW_SAMPLE_AGENT_ASSIST, {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		searchString: null,
		status: null,
		result: []
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
