import { actionTypes } from '@servicenow/ui-core';

import {fetchIncident , fetchUser , fetchLocation , fetchCompany} from './effects';
import {    INCIDENT_FETCH_REQUESTED , 
            INCIDENT_FETCH_SUCCESS , 
            INCIDENT_FETCH_ERROR , 
            LOADED_SUCCESSFULLY ,
            USER_FETCH_REQUESTED , 
            USER_FETCH_SUCCESS , 
            USER_FETCH_ERROR , 
            INCIDENT_TABLE, 
            PARAM_TABLE_ERROR , 
            NO_DATA_AVAILABLE , 
            COMPANY_FETCH,
            LOCATION_FETCH,
            COMPANY_FETCH_ERROR,
            LOCATION_FETCH_ERROR,
            COMPANY_FETCH_SUCCESS,
            LOCATION_FETCH_SUCCESS,
            LOCATION_TABLE,
            COMPANY_TABLE,
            USER_TABLE,
            OPEN_USER_DETAILS,
            PREVIEW_RECORD,
            TABLE
        } from './constants';


export default {

    [INCIDENT_FETCH_REQUESTED]: fetchIncident, //Fetch Incident.
    
    [INCIDENT_FETCH_SUCCESS]: (coeffects) => { //Ftech user when fetch Incident is successfull.
        const {action: { payload: {result} }, dispatch , updateState} = coeffects;
        if(result != null && result.caller_id != null && result.caller_id.value != null){
            dispatch(USER_FETCH_REQUESTED , {sysId: result.caller_id.value  , table : USER_TABLE});
        }else{
            let result = null;
            let reason = INCIDENT_FETCH_ERROR;
            let status = NO_DATA_AVAILABLE;
    
            updateState({status , result , reason });
        }
    },

    [USER_FETCH_REQUESTED]: fetchUser, //Fetch User

    [USER_FETCH_SUCCESS]: (coeffects) => {
        const {action: { payload: {result} }, dispatch , updateState} = coeffects;
        let status = LOADED_SUCCESSFULLY;

        let location = result.location.value;
        if(location != undefined && location != ""){ //Dispatch action for fetching location.
            dispatch(LOCATION_FETCH , {sysId : location , table : LOCATION_TABLE});	
        }
        
        let company = result.company.value;
        if(company != undefined && company != ""){ //Dispatch action for fetching company.
            dispatch(COMPANY_FETCH , {sysId : company , table : COMPANY_TABLE});	
        }
        
        updateState({result, status });	
    },

    [LOCATION_FETCH] : fetchLocation, //Fetch Location.

    [COMPANY_FETCH] : fetchCompany, //Fetch compaany.

    [COMPANY_FETCH_SUCCESS] : (coeffects)=>{ // Update the state when company response came.
        const {action: { payload: {result} },updateState} = coeffects;
        let companyResult = result;
        updateState({companyResult});	
    },

    [LOCATION_FETCH_SUCCESS] : (coeffects)=>{ //Update the state when location response came.
        const {action: { payload: {result} }, updateState} = coeffects;
        let locationResult = result;
        
        updateState({locationResult});	
    },

    [INCIDENT_FETCH_ERROR]	: (coeffects) => { //Show no data available when fetch incident throw error.
        let result = null;
        const {updateState} = coeffects;
        let reason = INCIDENT_FETCH_ERROR;
        let status = NO_DATA_AVAILABLE;

        updateState({status , result , reason });
    },

    [USER_FETCH_ERROR] : (coeffects) => { //Show no data available when fetch user throw error.
        let result = null;
        let status = NO_DATA_AVAILABLE;
        let reason = USER_FETCH_ERROR;

        const {updateState} = coeffects;
        updateState( {result , status , reason});	
    },

    [COMPANY_FETCH_ERROR] : ()=>{
        //By default if no company information, it shows "No Data"
    },

    [LOCATION_FETCH_ERROR] : () => {
        //By default if no location information, it shows "No Data"
    },

    [OPEN_USER_DETAILS] : (coeffects) => {
        const {dispatch , state :{ result : {sys_id}}} = coeffects;
        const table = USER_TABLE;
        dispatch(PREVIEW_RECORD , {table,sys_id});
    },

    [actionTypes.COMPONENT_BOOTSTRAPPED]: ( coeffects ) => {
        const {dispatch , updateState , state : {properties : {table , sysid}} } = coeffects;
        
        let sysId = sysid;
        if(table == INCIDENT_TABLE && sysId != null){
            dispatch(INCIDENT_FETCH_REQUESTED , {sysId,table});
        }else{
            //If the table is not "[INCIDENT_TABLE]", Show the message "No data available..."
            let result = null;
            let reason = PARAM_TABLE_ERROR;
            let status = NO_DATA_AVAILABLE;
            updateState({ result , status , reason });
        }
    }
};