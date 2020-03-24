import { actionTypes } from '@servicenow/ui-core';

import {fetchIncident , fetchUser , locationFetch , companyFetch} from './effects';
import {    INCIDENT_FETCH_REQUESTED , 
            INCIDENT_FETCH_SUCCESS , 
            INCIDENT_FETCH_ERROR , 
            LOADED_SUCCESSFULLY ,
            USER_FETCH_REQUESTED , 
            USER_FETCH_SUCCESS , 
            USER_FETCH_ERROR , 
            INCIDENT_TABLE , 
            UPDATE_STATE , 
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
            USER_TABLE
        } from './constants';


export default {

    [UPDATE_STATE] : (coeffects) => {
        
        let {state , action : {payload : {status , result , companyResult, locationResult , reason }} , updateState} = coeffects;

        result = (result == undefined) ? state.result : result;
        companyResult = ( companyResult == undefined ) ? state.companyResult : companyResult;
        locationResult = ( locationResult == undefined ) ? state.locationResult : locationResult;

        updateState({status , result, companyResult, locationResult, reason});
    },

    [INCIDENT_FETCH_REQUESTED]: fetchIncident, //Fetch Incident.
    
    [INCIDENT_FETCH_SUCCESS]: (coeffects) => { //Ftech user when fetch Incident is successfull.
        const {action: { payload: {result} }, dispatch} = coeffects;
        dispatch(USER_FETCH_REQUESTED , {sysId: result.caller_id.value  , table : USER_TABLE});
    },

    [USER_FETCH_REQUESTED]: fetchUser, //Fetch User

    [USER_FETCH_SUCCESS]: (coeffects) => {  //Fetch Location & Company when fetch user is successfull. Also update the state.
        const {action: { payload: {result} }, dispatch} = coeffects;
        let status = LOADED_SUCCESSFULLY;
        
        dispatch(LOCATION_FETCH , {sysId : result.location.value , table : LOCATION_TABLE});	
        dispatch(COMPANY_FETCH , {sysId : result.company.value , table : COMPANY_TABLE});	
        dispatch(UPDATE_STATE , {result, status });			
    },

    [LOCATION_FETCH] : locationFetch, //Fetch Location.

    [COMPANY_FETCH] : companyFetch, //Fetch compaany.

    [COMPANY_FETCH_SUCCESS] : (coeffects)=>{ // Update the state when company response came.
        const {action: { payload: {result} }, dispatch} = coeffects;
        let companyResult = result;
        let status = LOADED_SUCCESSFULLY;
        dispatch(UPDATE_STATE , {companyResult , status});	
    },

    [LOCATION_FETCH_SUCCESS] : (coeffects)=>{ //Update the state when location response came.
        const {action: { payload: {result} }, dispatch} = coeffects;
        let locationResult = result;
        let status = LOADED_SUCCESSFULLY;
        dispatch(UPDATE_STATE , {locationResult} , status);	
    },

    [INCIDENT_FETCH_ERROR]	: (coeffects) => { //Show no data available when fetch incident throw error.
        let result = null;
        const {dispatch} = coeffects;
        let reason = INCIDENT_FETCH_ERROR;
        let status = NO_DATA_AVAILABLE;

        dispatch(UPDATE_STATE , {status , result , reason });
    },

    [USER_FETCH_ERROR] : (coeffects) => { //Show no data available when fetch incident throw error.
        let result = null;
        let status = NO_DATA_AVAILABLE;
        let reason = USER_FETCH_ERROR;

        const {dispatch} = coeffects;
        dispatch( UPDATE_STATE , {result , status , reason});	
    },

    

    [COMPANY_FETCH_ERROR] : ()=>{
        //By default if no company information, it shows "No Data"
    },

    [LOCATION_FETCH_ERROR] : () => {
        //By default if no location information, it shows "No Data"
    },

    [actionTypes.COMPONENT_BOOTSTRAPPED]: ( coeffects ) => {
        const {dispatch , updateState , state : {properties : {table , sysId}} } = coeffects;
        debugger;
        if(table == INCIDENT_TABLE){
            dispatch(INCIDENT_FETCH_REQUESTED , {sysId,table});
        }else{
            //If the table is not "[INCIDENT_TABLE]", Show the message "No data available..."
            let result = null;
            let reason = PARAM_TABLE_ERROR;
            let status = NO_DATA_AVAILABLE;
            dispatch(UPDATE_STATE , { result , status , reason });
        }
        
    }
};