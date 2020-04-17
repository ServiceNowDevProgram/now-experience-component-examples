import '@servicenow/now-icon';
import {renderSearchResponse} from './renderSearchResponse';
import {
	AGENT_ASSIST,
	SEARCH_FETCH_IN_PROGRESS,
	SEARCH_FETCH_COMPLETED,
	REFRESH_SEARCH,
	LOADING
} from '../../constants';
import '@servicenow/now-loader';

export default (state, {dispatch, updateState}) => {
	const {status, searchString} = state;

	const triggerSearch = ({target: {value}}) => {
		const searchValue = value.trim();
		
		if (searchValue === searchString) {
			return;
		} else if (searchValue) {
			dispatch(REFRESH_SEARCH, {searchString: searchValue});
		} else {
			updateState({
				searchString: searchValue,
				result: []
			});
		}
	};

	return (
		<div className="now-agent-assist">
			<div className="now-agent-assist-heading">{AGENT_ASSIST}</div>
			<input
				className="now-agent-assist-search-input"
				value={searchString}
				on-blur={triggerSearch}
			></input>
			{status === SEARCH_FETCH_IN_PROGRESS ? (
				<now-loader label={LOADING} size="lg"></now-loader>
			) : null}
			{!status || status === SEARCH_FETCH_COMPLETED
				? renderSearchResponse(state)
				: null}
		</div>
	);
};
