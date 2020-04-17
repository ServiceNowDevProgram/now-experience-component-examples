import {NO_DATA_AVAILABLE, CUSTOMER360} from '../constants';

/**
 * 	Method to get the no data available view.
 */
export const getNoDataAvailableView = () => {
	return (
		<div className="now-customer-360">
			<span className="now-customer-360-caller-header">{CUSTOMER360}</span>
			<div className="now-customer-360-no-data-available">
				<now-icon icon="circle-info-outline" size="xl"></now-icon>
				<div>{NO_DATA_AVAILABLE}</div>
			</div>
		</div>
	);
};
