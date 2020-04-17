import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import {TAG_NOW_SAMPLE_AGENT_ASSIST_ITEM} from '../constants';
import view from './view';
import styles from './styles.scss';

createCustomElement(TAG_NOW_SAMPLE_AGENT_ASSIST_ITEM, {
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
