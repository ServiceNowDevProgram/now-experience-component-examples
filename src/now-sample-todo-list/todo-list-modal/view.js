import '@servicenow/now-button';

import {CANCEL, OK} from '../constants';

export default (state, {dispatch}) => {
	const {
		properties: {modalHeader, modalBody, itemId: id, cancelEvent, successEvent}
	} = state;

	return (
		<div className="now-todo-list-modal-container-overlay">
			<div className="now-todo-list-modal-container">
				<div className="now-todo-list-modal-header">{modalHeader}</div>
				<div className="now-todo-list-modal-body">{modalBody}</div>
				<div className="now-todo-list-modal-footer">
					<now-button
						label={CANCEL}
						size="md"
						variant="secondary"
						on-click={() => dispatch(cancelEvent, {id})}
					></now-button>
					<now-button
						label={OK}
						size="md"
						variant="primary"
						on-click={() => dispatch(successEvent, {id})}
					></now-button>
				</div>
			</div>
		</div>
	);
};
