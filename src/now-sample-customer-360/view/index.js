import {
	LOADED_SUCCESSFULLY,
	NO_DATA_AVAILABLE,
	LOADING_DATA
} from '../constants';
import {getNoDataAvailableView} from './getNoDataAvailableView';
import {getLoadingDataView} from './getLoadingDataView';
import {getCustomer360View} from './getCustomer360View';

export default (state, {dispatch}) => {
	const {userResult, status, locationResult, companyResult} = state;

	if (status === LOADED_SUCCESSFULLY) {
		return getCustomer360View(
			userResult,
			locationResult,
			companyResult,
			dispatch
		);
	} else if (status === NO_DATA_AVAILABLE) {
		return getNoDataAvailableView();
	} else if (status === LOADING_DATA) {
		return getLoadingDataView();
	}
};
