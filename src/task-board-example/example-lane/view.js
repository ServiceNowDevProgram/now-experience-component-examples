export default state => {
	const {
		properties: {title, cards}
	} = state;
	return (
		<div className="lane">
			<header>{title}</header>
			{cards.map(card => (
				<example-card
					key={card.cardId}
					card-id={card.cardId}
					title={card.title}
					lane={card.lane}
				/>
			))}
		</div>
	);
};
