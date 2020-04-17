import {NO_MATCHES_FOUND, NO_MATCHES_FOUND_MESSAGE} from '../../constants';
import '../../agent-assist-item';

export const renderSearchResponse = state => {
	const {result} = state;
	return (
		<div className="now-agent-assist-search-list">
			{result.length ? (
				result.map(item => (
					<now-sample-agent-assist-item
						article-short-description={item.short_description}
						article-body={item.text}
						item-id={item.sys_id}
						ref={item.sys_id}
					></now-sample-agent-assist-item>
				))
			) : (
				<span className="now-agent-assist-no-response-found">
					<div className="heading">{NO_MATCHES_FOUND}</div>
					<div>{NO_MATCHES_FOUND_MESSAGE}</div>
				</span>
			)}
		</div>
	);
};
