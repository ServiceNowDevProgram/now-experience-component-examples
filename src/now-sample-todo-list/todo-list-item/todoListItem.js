import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';

import view from './view';
import styles from './listItem.scss';
import actionHandlers from './actionHandlers';
import {TAG_NOW_SAMPLE_TODO_LIST_ITEM} from '../constants';

createCustomElement(TAG_NOW_SAMPLE_TODO_LIST_ITEM, {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers,
	properties: {
		itemCompleted: {
			default: null
		},
		itemId: {
			default: null
		},
		itemLabel: {
			default: null
		}
	}
});
