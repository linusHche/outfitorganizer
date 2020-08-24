import { combineReducers } from 'redux';

import account from './Account';
import modal from './Modal';
import outfit from './Outfit';
import clothes from './Clothes';

export default combineReducers({
	account,
	modal,
	outfit,
	clothes,
});
