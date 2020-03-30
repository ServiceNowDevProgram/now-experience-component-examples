import {createCustomElement , actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { CUSTOME_ELEMENT_NOW_SAMPLE_AGENT_ASSIST } from './constants';

import view from './view/view';
import actionHandlers from './action-handlers';
import styles from './styles.scss';

createCustomElement(CUSTOME_ELEMENT_NOW_SAMPLE_AGENT_ASSIST, {
	renderer: {type: snabbdom},
	view,
	styles,
	properties : {
		fields : {
					default : {
						short_description: {
							displayValue: 'email',
							value: 'email',
							visible: true

						}
					}
				 }
	},
	actionHandlers
});
