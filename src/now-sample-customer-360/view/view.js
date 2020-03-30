import { LOADED_SUCCESSFULLY, NO_DATA_AVAILABLE } from '../constants'
import { getNoDataAvailableView } from './no-data-available-view';
import { getLoadingDataView } from './loading-view';
import { getCustomer360View } from './customer-360-view';

export default (state, {dispatch}) => {
	
	const { result , status , locationResult , companyResult } = state;

	if(status == LOADED_SUCCESSFULLY){
		 return getCustomer360View( result , locationResult , companyResult , dispatch );
	}else if(status == NO_DATA_AVAILABLE){
		return getNoDataAvailableView();
	}else{
		return getLoadingDataView();
	}
}