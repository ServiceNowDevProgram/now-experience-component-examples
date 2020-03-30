import { LOADING_DATA } from '../constants';


/**
 * 	Method to get the loading view.
 */
export const getLoadingDataView = () => {
	return (
		<div className="customer360-caller">
			<div className="loading-data">
				<label>{LOADING_DATA}</label>
			</div>
		</div>
	);
}