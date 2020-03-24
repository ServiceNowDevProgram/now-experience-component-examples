import { LOADED_SUCCESSFULLY, NO_DATA_AVAILABLE } from '../constants'
import { getNoDataAvailableView } from './no-data-available';
import { getLoadingDataView } from './loading-view';
import { getCustomer360View } from './customer360view';
import { locationFetch, companyFetch } from '../effects';

export default (state, {dispatch}) => {
	
	const { result , status , locationResult , companyResult } = state;

	if(status == LOADED_SUCCESSFULLY){
		return getCustomer360View( result , locationResult , companyResult );
	}else if(status == NO_DATA_AVAILABLE){
		return getNoDataAvailableView();
	}else{
		return getLoadingDataView();
	}
}