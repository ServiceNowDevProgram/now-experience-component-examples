import '@servicenow/now-icon';
import '@servicenow/now-loader';
import '@servicenow/now-heading';
import {renderSearchResponse} from './renderSearchResponse';
import {SEARCH_REQUESTED} from '../constants';

export default (state, {dispatch, updateState}) => {
	const {isLoading, searchString, result} = state;

	const triggerSearch = ({target: {value}}) => {
		const searchValue = value.trim();

		if (searchValue === searchString) {
			return;
		} else if (searchValue) {
			dispatch(SEARCH_REQUESTED, {searchString: searchValue});
		} else {
			updateState({
				searchString: searchValue,
				result: []
			});
		}
	};

	return (
		<div className="now-agent-assist">
			<header>
				<now-heading label="Agent Assist" variant="header-secondary" />
				<input
					className="now-agent-assist-search-input"
					value={searchString}
					on-blur={triggerSearch}></input>
			</header>
			<main>
				{isLoading ? (
					<now-loader label="Loading..." size="lg"></now-loader>
				) : (
					renderSearchResponse(result)
				)}
			</main>
		</div>
	);
};
