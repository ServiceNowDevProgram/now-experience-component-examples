import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import style from './counter.scss';
import view from './view';

createCustomElement('example-counter', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		tally: 0
	},
	styles: style
});
