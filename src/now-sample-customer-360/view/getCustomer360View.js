import {NO_DATA, CALLER, OPEN_USER_DETAILS} from '../constants';

const openUser = dispatch => {
	dispatch(OPEN_USER_DETAILS, {});
};

const getCalleData = (result, locationResult, companyResult) => {
	const {name, photo} = result;
	const itemOne = [
		{label: 'Name', value: {type: 'string', value: name}},
		{
			label: 'Company',
			value: {
				type: 'string',
				value: (companyResult && companyResult.name) || NO_DATA
			}
		},
		{
			label: 'Location',
			value: {
				type: 'string',
				value: (locationResult && locationResult.name) || NO_DATA
			}
		}
	];

	const itemTwo = [
		{
			label: 'Email',
			value: {
				type: 'string',
				value: result.email || NO_DATA
			}
		},
		{
			label: 'Business Phone',
			value: {
				type: 'string',
				value: result.phone || NO_DATA
			}
		},
		{
			label: 'City',
			value: {type: 'string', value: result.city || NO_DATA}
		}
	];

	return {
		itemOne,
		itemTwo,
		name,
		photo
	};
};

export const getCustomer360View = (
	result,
	locationResult,
	companyResult,
	dispatch
) => {
	const dataFormat = getCalleData(result, locationResult, companyResult);
	return (
		<div className="now-customer-360">
			<span className="now-customer-360-caller-header">{CALLER}</span>
			<span className="now-customer-360-caller-icon">
				<span
					className="now-customer-360-caller-click"
					on-click={() => {
						openUser(dispatch);
					}}
				>
					<now-avatar
						size="lg"
						user-name={dataFormat.name}
						image-src={
							dataFormat.photo ? '/' + dataFormat.photo + '.iix?t=small' : ''
						}
					></now-avatar>
				</span>
			</span>
			<span className="now-customer-360-caller-name">
				<span
					className="now-customer-360-caller-click"
					on-click={() => {
						openUser(dispatch);
					}}
				>
					{dataFormat.name}
				</span>
			</span>
			<span className="now-customer-360-caller-details">
				<now-label-value-stacked
					align="horizontal-equal"
					delimiter=","
					items={dataFormat.itemOne}
					size="md"
					truncated
				></now-label-value-stacked>
			</span>
			<span className="now-customer-360-caller-details">
				<now-label-value-stacked
					align="horizontal-equal"
					delimiter=","
					items={dataFormat.itemTwo}
					size="md"
					truncated
				></now-label-value-stacked>
			</span>
		</div>
	);
};
