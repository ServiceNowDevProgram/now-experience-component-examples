export default (state, {updateState}) => {
	const {tally} = state;
	return (
		<div>
			<h2>Click Counter</h2>
			<span>
				<button
					type="button"
					on-click={() => updateState({tally: tally + 1})}>
					Increment
				</button>
			</span>
			<span>
				<button type="button" on-click={() => updateState({tally: 0})}>
					Clear
				</button>
			</span>
			<div>Value: {tally}</div>
		</div>
	);
};
