import { TOGGLE_CLICKED, NOW_BUTTON_CLICKED, UPDATE_TODO, DELETE_TODO } from '../constants';

export default {
    [TOGGLE_CLICKED]: {
        stopPropagation: true,
        effect: ({state, action, dispatch}) => {
            action.preventDefault();
            const {itemId} = state.properties;
            const {value} = action.payload;
            dispatch(UPDATE_TODO, {id: itemId, active: !value});
        }
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