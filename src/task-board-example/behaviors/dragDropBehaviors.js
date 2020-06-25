import {actionTypes} from '@servicenow/ui-core';

const {COMPONENT_BOOTSTRAPPED} = actionTypes;

export const DROPPED = 'DROPPED';

export const dropBehavior = {
	name: 'dropBehavior',
	eventHandlers: [
		{
			events: ['dragover'],
			effect({action: {payload: {event}}}) {
				event.preventDefault();
			}
		},
		{
			events: ['drop'],
			effect({
				dispatch,
				action: {
					payload: {event}
				}
			}) {
				const data = JSON.parse(event.dataTransfer.getData('application/json'));
				dispatch(DROPPED, {data});
			}
		}
	]
};

export const dragBehavior = {
	name: 'dragBehavior',
	properties: {draggable: {default: 'true', reflect: true}},
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]({updateState, action: {payload: {options}}}) {
			updateState({getData: options.getData})
		}
	},
	eventHandlers: [
		{
			events: ['dragstart'],
			effect(coeffects) {
				const {
					state: {getData},
					action: {payload: {event}}
				} = coeffects;

				const data = getData(coeffects);
				event.dataTransfer.setData('application/json', JSON.stringify(data));
			}
		}
	]
};
