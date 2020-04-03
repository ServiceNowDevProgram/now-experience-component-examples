import fetchHandlers from './action-handlers/fetch';
import createHandlers from './action-handlers/create';
import updateHandlers from './action-handlers/update';
import deleteHandlers from './action-handlers/delete';

import {SHOW_MODAL, NOW_ALERT_ACTION_CLICKED} from '../constants';

export default {
	...fetchHandlers,
	...createHandlers,
	...updateHandlers,
	...deleteHandlers,

	[SHOW_MODAL]: coeffects => {
		const {
			action: {payload},
			updateState
		} = coeffects;
		const {id, header, body, cancelEvent, successEvent} = payload;
		updateState({modal: {id, header, body, cancelEvent, successEvent}});
	},

	[NOW_ALERT_ACTION_CLICKED]: ({updateState}) => {
		updateState({alert: null});
	}
};
