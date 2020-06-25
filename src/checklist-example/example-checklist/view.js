import '@servicenow/now-heading';
import '@servicenow/now-button';
import '@servicenow/now-loader';
import '@servicenow/now-label-value';
import '../example-checklist-item';
import {CHECKLIST_ITEM_ADD, ENTER_KEY_CODE, FILTER} from '../constants';

const filterItems = (items, filter) => {
	switch (filter) {
	case FILTER.ALL:
		return items;
	case FILTER.INCOMPLETE:
		return items.filter(item => !item.active);
	case FILTER.COMPLETE:
		return items.filter(item => item.active);
	}
};

export default (state, {dispatch, updateProperties}) => {
	const {
		properties: {itemsLeft, filter},
		items,
		inputValue,
		isLoading
	} = state;
	const filteredItems = filterItems(items, filter);
	return (
		<main className="now-checklist">
			<header>
				<now-heading label="Checklist" />
			</header>
			<input
				className="now-checklist-input"
				placeholder="What needs to be done?"
				autoFocus
				value={inputValue}
				on-keypress={({keyCode, target: {value}}) => {
					const inputValue = value.trim();
					if (keyCode === ENTER_KEY_CODE && inputValue) {
						dispatch(CHECKLIST_ITEM_ADD, {inputValue});
					}
				}}
			/>
			<div className="now-m-block-end--lg" role="table" aria-label="Checklist">
				<div role="rowgroup">
					<div className="now-checklist-thead" role="row">
						<span className="now-checklist-th -center" role="columnheader">
							Mark as done
						</span>
						<span className="now-checklist-th" role="columnheader">
							Task
						</span>
					</div>
				</div>
				<div role="rowgroup">
					{isLoading ? (
						<now-loader label="Loading..." size="lg" />
					) : (
						filteredItems.map(item => (
							<example-checklist-item
								key={item.itemId}
								itemId={item.itemId}
								label={item.short_description}
								active={item.active}
							/>
						))
					)}
					{!filteredItems.length ? (
						<now-label-value-inline label="No Items to display" />
					) : null}
				</div>
			</div>
			<footer className="now-checklist-footer">
				<p>
					<b>{itemsLeft}</b> item{itemsLeft === 1 ? '' : 's'} left
					<span>
						(<b>{filteredItems.length}</b> visible)
					</span>
				</p>
				<now-button
					className="now-checklist-button"
					variant={filter === FILTER.ALL ? 'primary' : 'secondary'}
					size="sm"
					label="Show All"
					on-click={() => updateProperties({filter: FILTER.ALL})}
				/>
				<now-button
					className="now-m-inline--xs"
					variant={filter === FILTER.INCOMPLETE ? 'primary' : 'secondary'}
					size="sm"
					label="Show Incomplete"
					on-click={() => updateProperties({filter: FILTER.INCOMPLETE})}
				/>
				<now-button
					variant={filter === FILTER.COMPLETE ? 'primary' : 'secondary'}
					size="sm"
					label="Show Complete"
					on-click={() => updateProperties({filter: FILTER.COMPLETE})}
				/>
			</footer>
		</main>
	);
};
