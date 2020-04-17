import {NOW_BUTTON_CLICKED, DELETE_TODO} from '../constants';

export default {
	[NOW_BUTTON_CLICKED]: {
		stopPropagation: true,
		effect: ({state, action, dispatch}) => {
			action.preventDefault();
			const {
				properties: {itemId: id}
			} = state;
			dispatch(DELETE_TODO, {id});
		}
	}
};
