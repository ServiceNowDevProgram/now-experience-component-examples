import { CHECKBOX_CLICKED, NOW_BUTTON_CLICKED, UPDATE_TODO, DELETE_TODO } from '../constants';

export default {
    [CHECKBOX_CLICKED]: ({state, dispatch}) => {
        const {itemId, itemCompleted} = state.properties;
        dispatch(UPDATE_TODO, {id: itemId, active: itemCompleted});
    },
    [NOW_BUTTON_CLICKED]: {
        stopPropagation: true,
        effect: ({state, action, dispatch}) => {
            action.preventDefault();
            const {itemId} = state.properties;
            dispatch(DELETE_TODO, {id: itemId});
        }
    }
};