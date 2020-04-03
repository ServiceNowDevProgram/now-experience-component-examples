import {
	NO_SEARCH_ITEMS,
	NO_MATCHES_FOUND,
	TRY_MODIFY_YOUR_SEARCH_1,
	TRY_MODIFY_YOUR_SEARCH_2
} from '../constants';

export const renderSearchEmptyResponse = status => {
	if (status !== NO_SEARCH_ITEMS) {
		return null;
	} else {
		return (
			<span className="no-response-found">
				<label className="info-heading">{NO_MATCHES_FOUND}</label>
				<label className="info-detailed-text">{TRY_MODIFY_YOUR_SEARCH_1}</label>
				<label className="info-detailed-text2">
					{TRY_MODIFY_YOUR_SEARCH_2}
				</label>
			</span>
		);
	}
};
