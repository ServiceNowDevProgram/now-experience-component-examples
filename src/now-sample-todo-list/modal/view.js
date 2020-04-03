import '@servicenow/now-button';

import {MODAL_EVENT_CONTINUE, MODAL_EVENT_CANCEL} from '../constants';

export default (state, {dispatch}) => {
	const {
		properties: {modalHeader, modalBody}
	} = state;

	return (
		<div className="modal-container-overlay">
			<div className="modal-container">
				<div className="modal-header">{modalHeader}</div>
				<div className="modal-body">{modalBody}</div>
				<div className="modal-footer">
					<now-button
						label="Cancel"
						size="md"
						variant="secondary"
						on-click={() => dispatch(MODAL_EVENT_CANCEL)}
					/>
					<now-button
						label="Ok"
						size="md"
						variant="primary"
						on-click={() => dispatch(MODAL_EVENT_CONTINUE)}
					/>
				</div>
			</div>
		</div>
	);
};
