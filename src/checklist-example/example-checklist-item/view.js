import '@servicenow/now-toggle';
import {
	CHECKLIST_ITEM_UPDATED,
	ENTER_KEY_CODE,
	ESC_KEY_CODE
} from '../constants';

export default (state, {dispatch, updateProperties}) => {
	const {
		properties: {itemId, label, active, editing}
	} = state;
	const setEditing = editing => updateProperties({editing});

	const labelCell = (
		<span
			className="now-checklist-item-cell"
			role="cell"
			on-dblclick={() => setEditing(true)}>
			{label}
		</span>
	);

	const inputCell = (
		<span className="now-checklist-item-cell" role="cell">
			<input
				className="now-checklist-item-input"
				value={label}
				hook-insert={vnode => vnode.elm.focus()}
				on-keydown={({keyCode, target: {value: label}}) => {
					const newLabel = label.trim();
					if (keyCode === ENTER_KEY_CODE) {
						setEditing(false);
						if (newLabel) {
							dispatch(CHECKLIST_ITEM_UPDATED, {
								itemId,
								short_description: newLabel
							});
						}
					} else if (keyCode === ESC_KEY_CODE) {
						setEditing(false);
					}
				}}
				on-blur={() => setEditing(false)}
			/>
		</span>
	);

	return (
		<div className="now-checklist-item" role="row">
			<span className="now-checklist-item-cell -center" role="cell">
				<now-toggle checked={active} manageChecked disabled={editing} />
			</span>
			{editing ? inputCell : labelCell}
			<now-button-iconic
				icon="close-outline"
				tooltipContent="Delete"
				size="sm"
				appendToPayload={{itemId}}
				variant="tertiary"
			/>
		</div>
	);
};
