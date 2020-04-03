import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {CUSTOME_ELEMENT_NOW_SAMPLE_AGENT_ASSIST_RESPONSE_ITEM} from '../constants';

import view from './view';
import styles from './styles.scss';

createCustomElement(CUSTOME_ELEMENT_NOW_SAMPLE_AGENT_ASSIST_RESPONSE_ITEM, {
	renderer: {type: snabbdom},
	view,
	styles,
	properties: {
		articleShortDescription: {
			default: null
		},
		articleBody: {
			default: null
		}
	}
});
