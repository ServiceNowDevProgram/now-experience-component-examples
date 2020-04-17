import {LOADING_DATA} from '../constants';

/**
 * 	Method to get the loading view.
 */
export const getLoadingDataView = () => {
	return (
		<div className="now-customer-360">
			<div className="now-customer-360-loading-data ">{LOADING_DATA}</div>
		</div>
	);
};
