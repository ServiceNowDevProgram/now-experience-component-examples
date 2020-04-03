import '@servicenow/now-toggle';
import '@servicenow/now-button';
import {CHECKBOX_CLICKED} from '../constants';

export default (state, {dispatch}) => {
	const {
		properties: {itemCompleted, itemLabel}
	} = state;
	const itemClass = itemCompleted ? 'checked' : 'unchecked';

	return (
		<div className="todo-list-item">
			<span className="checkbox" on-click={() => dispatch(CHECKBOX_CLICKED)}>
				<i className={itemClass}></i>
			</span>
			<label className={itemClass}>{itemLabel}</label>
			<now-button
				bare={true}
				cta="Positive"
				iconName="circle-close-outline"
				iconSet="solid"
				label=""
				size="sm"
				variant="secondary"></now-button>
		</div>
	);
};
