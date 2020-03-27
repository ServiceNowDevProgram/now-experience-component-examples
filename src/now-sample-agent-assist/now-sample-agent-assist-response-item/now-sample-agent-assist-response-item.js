import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './styles.scss';

createCustomElement('now-sample-agent-assist-response-item', {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		articleShortDescription : {
			default : null
		},
		articleBody: {
			default : null
		}
	}
});
