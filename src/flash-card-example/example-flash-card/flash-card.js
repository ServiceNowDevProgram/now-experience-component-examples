import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './flash-card.scss';
import view from './view';

createCustomElement('example-flash-card', {
	renderer: {type: snabbdom},
	view,
	styles
});
