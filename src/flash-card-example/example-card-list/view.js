import {Fragment} from '@servicenow/ui-renderer-snabbdom';

const renderAttributes = attributes => (
	<dl slot="attr">
		{attributes.map(attr => {
			return (
				<Fragment>
					<dt>
						<span>{attr.title}</span>
					</dt>
					<dd>{attr.description}</dd>
				</Fragment>
			);
		})}
	</dl>
);

export default ({cards}) => (
	<div className="card-list">
		{cards.map(card => (
			<example-flash-card>
				<span slot="title">{card.title}</span>
				<span slot="desc">{card.description}</span>
				{card.attributes &&
					card.attributes.length &&
					renderAttributes(card.attributes)}
			</example-flash-card>
		))}
	</div>
);
