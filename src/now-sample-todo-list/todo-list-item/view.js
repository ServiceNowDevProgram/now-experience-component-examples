import '@servicenow/now-toggle';
import '@servicenow/now-button';
import {UPDATE_TODO} from '../constants';

export default (state, {dispatch}) => {
	const {
		properties: {itemCompleted, itemLabel, itemId}
	} = state;
	const itemClass = itemCompleted ? 'checked' : 'unchecked';

	return (
		<div className="now-todo-list-item">
			<span
				className="now-todo-list-item-checkbox"
				on-click={() =>
					dispatch(UPDATE_TODO, {id: itemId, active: itemCompleted})
				}
			>
				<i className={itemClass}></i>
			</span>
			<label className={itemClass}>{itemLabel}</label>
			<now-button
				bare
				cta="Positive"
				iconName="circle-close-outline"
				iconSet="solid"
				size="sm"
				variant="secondary"
			></now-button>
		</div>
	);
};
