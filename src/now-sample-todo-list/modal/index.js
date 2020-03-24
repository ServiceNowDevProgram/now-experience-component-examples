import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './styles.scss';
import actionHandlers from './action-handlers';

createCustomElement('sn-modal', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers,
	properties: {
        itemId: {},
		modalHeader: {},
		modalBody: {},
		cancelEvent: {},
		successEvent: {}
	}
});
