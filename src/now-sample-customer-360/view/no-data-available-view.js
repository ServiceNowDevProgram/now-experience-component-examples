import { NO_DATA_AVAILABLE , CUSTOMER360 } from '../constants'

/**
 * 	Method to get the no data available view.
 */
export const getNoDataAvailableView = () => {
	return (
		<div className="customer360-caller">
				<span className="customer360-caller-header">
					<span>{CUSTOMER360}</span>
				</span>
				<div className="no-data-available">
					<now-icon icon="circle-info-outline" size="xl"></now-icon>
					<br /><label>{NO_DATA_AVAILABLE}</label>
				</div>
		</div>
	);
}