import { INPUT_PASSWORD, INPUT_USERNAME, INPUT_CONFIRM_PASSWORD } from '../Actions/accountActions';

const defaultLoginState = {
	username: '',
	password: '',
	confirmPassword: '',
};

export default function (state = defaultLoginState, action) {
	switch (action.type) {
		case INPUT_USERNAME:
			return { ...state, username: action.username };
		case INPUT_PASSWORD:
			return { ...state, password: action.password };
		case INPUT_CONFIRM_PASSWORD:
			return { ...state, password: action.confirmPassword };
		default:
			return state;
	}
}
