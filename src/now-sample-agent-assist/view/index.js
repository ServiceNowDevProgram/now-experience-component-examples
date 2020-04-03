import '@servicenow/now-icon';

import {AGENT_ASSIST} from '../constants';

import {renderSearchInProgress} from './renderSearchInProgress';
import {renderSearchResponse} from './renderSearchResponse';

export default (state, {dispatch, updateState}) => {
	const {status} = state;

	return (
		<div className="sample-agent-assist">
			<label className="sample-agent-assist-heading">{AGENT_ASSIST}</label>
			{renderSearchInProgress(status)}
			{renderSearchResponse({state, updateState, dispatch})}
		</div>
	);
};
