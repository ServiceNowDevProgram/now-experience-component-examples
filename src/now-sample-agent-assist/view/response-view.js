import { FOUND_SEARCH_ITEMS , REFRESH_SEARCH , NO_SEARCH_ITEMS , KB_KNOWLEDGE_TABLE} from '../constants';
import { renderSearchEmptyResponse } from './no-response-view';
import '../now-sample-agent-assist-response-item';

export const renderSearchResponse = (state , dispatch) => {
    const {properties : {fields} , status , result } = state
    const searchStr = fields.short_description.value;
    
    
    const triggerSearch = (event) => {
        const searchString = event.target.value;
        const sysparm_query = `short_descriptionLIKE${searchString}^ORtextLIKE${searchString}`;
        dispatch(REFRESH_SEARCH, {table : KB_KNOWLEDGE_TABLE , sysparm_query})
    }

    if(status != FOUND_SEARCH_ITEMS && status != NO_SEARCH_ITEMS){
        return;
    }else{
        return (
            <div className="search-list-parent">
                <input className="search-input" value={searchStr} on-blur ={triggerSearch}></input>
                <div className="search-list">
                    {renderSearchEmptyResponse(status)}
                    { result.map(item => <now-sample-agent-assist-response-item article-short-description = {item.short_description} article-body = {item.text} itemId={item.sys_id} ></now-sample-agent-assist-response-item>) }
                </div>
            </div>
        );
    }
}