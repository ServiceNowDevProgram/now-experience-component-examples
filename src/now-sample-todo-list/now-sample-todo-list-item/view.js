import '@servicenow/now-toggle';
import '@servicenow/now-button';

export default (state) => {
	const { properties: {itemCompleted, itemLabel} } = state;
	
	return (
		<div className="todo-list-item">
			<now-toggle checked={itemCompleted} size="md"></now-toggle>
			<label className={itemCompleted ? 'checked' : 'unchecked'}>
				{itemLabel}
			</label>
			<now-button cta="Positive" iconName="" iconSet="solid" label="X" size="sm" variant="secondary"></now-button>
		</div>
	)
};