import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '../example-flash-card';
import {CARDS} from '../constants';
import view from './view';
import styles from './card-list.scss';

createCustomElement('example-card-list', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		cards: CARDS
	},
	styles
});
