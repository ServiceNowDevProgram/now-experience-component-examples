import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './styles.scss';
import {TAG_SN_MODAL} from '../constants';

createCustomElement(TAG_SN_MODAL, {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		itemId: {
			default: null
		},
		modalHeader: {
			default: null
		},
		modalBody: {
			default: null
		},
		cancelEvent: {
			default: null
		},
		successEvent: {
			default: null
		}
	}
});
