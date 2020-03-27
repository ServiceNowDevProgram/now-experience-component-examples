import '@servicenow/now-icon';


import { AGENT_ASSIST } from '../constants';

import { renderSearchInProgress } from './in-progress-view';
import { renderSearchResponse } from './response-view';

export default (state, {dispatch, updateState , updateProperties} ) => {
	const {properties : {fields} , status , result} = state;
	const searchStr = fields.short_description.value;
	return (
        <div className="sample-agent-assist"> 
			<label className="sample-agent-assist-heading" >{ AGENT_ASSIST }</label>
			{renderSearchInProgress(status)}
			{renderSearchResponse(state , dispatch)}
        </div>
	);
};