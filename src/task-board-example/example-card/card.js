import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './card.scss';
import {dragBehavior} from '../behaviors/dragDropBehaviors';

const view = ({properties: {title}}) => <div className="card">{title}</div>;

createCustomElement('example-card', {
	renderer: {type: snabbdom},
	view,
	properties: {
		cardId: {
			default: 0,
			reflect: false
		},
		title: {},
		lane: {}
	},
	styles,
	behaviors: [{
		behavior: dragBehavior,
		options: {
			getData({properties: {cardId, lane}}) {
				return {cardId, lane};
			}
		}
	}]
});
