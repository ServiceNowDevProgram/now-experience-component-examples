import { NO_DATA , CALLER } from '../constants';


/**
 *  Method to get the customer 360 view.
 */
export const getCustomer360View = (result , locationResult , companyResult) => {
	let dataFormat = getCalleData(result, locationResult , companyResult);
	return (
		<div className="customer360">
			<div className="customer360-caller">
					<span className="customer360-caller-header">
						<span>{CALLER}</span>
					</span>
					<span className="customer360-caller-icon">
                        <now-avatar size="lg" user-name={ dataFormat.photo == "" ? dataFormat.name : ""}  image-src={ dataFormat.photo != "" ? "/"+dataFormat.photo+".iix?t=small" : ""}></now-avatar>
					</span>
					<span className="customer360-caller-username">
						{dataFormat.name}
					</span>
					<span className="customer360-caller-username">
						<now-label-value-stacked align="horizontal-equal" item-min-width="100px" delimiter="," items={dataFormat.itemOne} size="md" truncated></now-label-value-stacked>
					</span>
					<span className="customer360-caller-username">
						<now-label-value-stacked align="horizontal-equal" item-min-width="100px" delimiter="," items={dataFormat.itemTwo} size="md" truncated></now-label-value-stacked>
					</span>
			</div>
		</div>
	);
}

const getCalleData = function(result, locationResult , companyResult){
	
	let name = null;
	let photo = null;
	let itemOne = null;
	let itemTwo = null;
	
	name = result.name;
	photo = result.photo;

	itemOne = [ 
		{ "label": "Name", "value": {"type": "string", "value": name } }, 
		{ "label": "Company", "value": {"type": "string", "value": companyResult != null && companyResult.name != "" && companyResult.name != null ? companyResult.name : NO_DATA } }, 
		{ "label": "Location", "value": {"type": "string", "value": locationResult != null && locationResult.name != "" && locationResult.name != null ? locationResult.name : NO_DATA } }, 
	];

	itemTwo = [ 
		{ "label": "Email", "value": {"type": "text-link","label":  result.email != "" ? result.email : NO_DATA} }, 
		{ "label": "Business Phone", "value": {"type": "string", "value":  result.phone != "" ? result.phone : NO_DATA } }, 
		{ "label": "City", "value": {"type": "string", "value": result.city != "" ? result.city : NO_DATA  } }, 
	];
	

	return { itemOne , itemTwo , name , photo};
}
