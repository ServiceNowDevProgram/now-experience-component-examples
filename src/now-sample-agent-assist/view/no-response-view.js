import { NO_SEARCH_ITEMS , NO_MATCHES_FOUND , TRY_MODIFY_YOUR_SEARCH } from '../constants'

export const renderSearchEmptyResponse = (status) => {
    debugger;
    if(status != NO_SEARCH_ITEMS){
        return;
    }else{
        return (
            <span className="no-response-found">
                <label className="info-heading">{NO_MATCHES_FOUND}</label>
                <label className="info-detailed-text" >{TRY_MODIFY_YOUR_SEARCH}</label>
            </span>
        );
    }
}