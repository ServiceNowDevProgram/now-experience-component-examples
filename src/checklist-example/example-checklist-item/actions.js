import {TOGGLE_CLICKED, CHECKLIST_ITEM_UPDATED} from '../constants';

export default {
	actionHandlers: {
		[TOGGLE_CLICKED]: {
			stopPropagation: true,
			effect: ({state, action, dispatch}) => {
				action.preventDefault();
				const {itemId} = state.properties;
				const {value} = action.payload;
				dispatch(CHECKLIST_ITEM_UPDATED, {itemId, active: value});
			}
		}
	}
};
