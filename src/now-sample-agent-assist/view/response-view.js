import { 
        FOUND_SEARCH_ITEMS, 
        REFRESH_SEARCH, 
        NO_SEARCH_ITEMS,
        NO_KB_KNOWLEDGE_RECORDS
    }  from '../constants';

import { renderSearchEmptyResponse } from './no-response-view';
import '../now-sample-agent-assist-response-item';

export const renderSearchResponse = ({state , updateState , dispatch}) => {
    const {status , result , SEARCH_STRING } = state;
    
    const triggerSearch = ({target : {value}}) => {
        let SEARCH_STRING = value;
        if(SEARCH_STRING != "" && SEARCH_STRING != null){
            SEARCH_STRING = SEARCH_STRING.trim();

            updateState({ SEARCH_STRING });
            dispatch(REFRESH_SEARCH, {});
        }else{
            //If search string is empty, Clear the response list...
			dispatch(NO_KB_KNOWLEDGE_RECORDS, {});
        }
    }

    if(status != FOUND_SEARCH_ITEMS && status != NO_SEARCH_ITEMS){
        return;
    }else{
        return (
            <div className="search-list-parent">
                <input className="search-input" value={SEARCH_STRING} on-blur ={triggerSearch}></input>
                <div className="search-list">
                    {renderSearchEmptyResponse(status)}
                    { 
                        result.map(item => <now-sample-agent-assist-response-item 
                                                article-short-description = {item.short_description} 
                                                article-body = {item.text} 
                                                itemId={item.sys_id} />) 
                    }
                </div>
            </div>
        );
    }
}