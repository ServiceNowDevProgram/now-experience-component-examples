import '../example-lane';

export default state => {
	const {lanes, cards} = state;
	return (
		<div className="task-board">
			{lanes.map(lane => (
				<div className="lane-container">
					<example-lane
						key={lane.laneId}
						laneId={lane.laneId}
						title={lane.title}
						cards={cards.filter(card => card.lane === lane.laneId)}
					/>
				</div>
			))}
		</div>
	);
};
