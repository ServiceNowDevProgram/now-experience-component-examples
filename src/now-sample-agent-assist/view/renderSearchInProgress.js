import '@servicenow/now-loader';

import {SEARCH_FETCH_IN_PROGRESS, LOADING} from '../constants';

export const renderSearchInProgress = status => {
	if (status !== SEARCH_FETCH_IN_PROGRESS) {
		return null;
	} else {
		return (
			<div className="search-list">
				<now-loader label={LOADING} size="lg"></now-loader>
			</div>
		);
	}
};
