import {MODAL_EVENT_CONTINUE, MODAL_EVENT_CANCEL} from '../constants';

export default {
    [MODAL_EVENT_CONTINUE]: {
        stopPropagation: true,
        effect: ({state, action, dispatch}) => {
            action.preventDefault();
            const {itemId, successEvent} = state.properties;
            dispatch(successEvent, {id: itemId});
        }
    },
    [MODAL_EVENT_CANCEL]: {
        stopPropagation: true,
        effect: ({state, action, dispatch}) => {
            action.preventDefault();
            const {itemId, cancelEvent} = state.properties;
            dispatch(cancelEvent, {id: itemId});
        }
    }
};