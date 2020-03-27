import {createCustomElement , actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view/view';
import actionHandlers from './action-handlers';
import styles from './styles.scss';

createCustomElement('now-sample-agent-assist', {
	renderer: {type: snabbdom},
	view,
	styles,
	properties : {
		fields : {
					default : {
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
