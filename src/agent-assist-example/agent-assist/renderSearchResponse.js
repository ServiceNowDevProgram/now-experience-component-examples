import {Fragment} from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-label-value';
import '../agent-assist-item';
import {NO_MATCHES_FOUND, NO_MATCHES_FOUND_MESSAGE} from '../constants';

export const renderSearchResponse = result => (
	<Fragment>
		{result.length ? (
			result.map(item => (
				<agent-assist-item
					article-short-description={item.short_description}
					article-body={item.text}
					item-id={item.sys_id}
					ref={item.sys_id}
				/>
			))
		) : (
			<span className="no-response-found">
				<now-heading label={NO_MATCHES_FOUND} variant="title-tertiary" />
				<now-label-value-inline label={NO_MATCHES_FOUND_MESSAGE} />
			</span>
		)}
	</Fragment>
);
