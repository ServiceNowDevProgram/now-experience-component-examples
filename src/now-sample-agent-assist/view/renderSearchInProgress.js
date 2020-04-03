import '@servicenow/now-loader';

import {SEARCH_FETCH_IN_PROGRESS, LOADING} from '../constants';

export const renderSearchInProgress = status => {
	if (status != SEARCH_FETCH_IN_PROGRESS) {
		return;
	} else {
		return (
			<div className="search-list">
				<div>
					<now-loader label={LOADING} size="lg"></now-loader>
				</div>
			</div>
		);
	}
};
