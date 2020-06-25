import {CARD_DROPPED} from '../constants';

export default {
	actionHandlers: {
		[CARD_DROPPED]: {
			stopPropagation: true,
			effect: ({state, updateState, action}) => {
				updateState({
					cards: state.cards.map(card => {
						if (card.cardId === action.payload.cardId)
							return {
								...card,
								lane: action.payload.lane
							};

						return card;
					})
				})
			}
		}
	}
};
