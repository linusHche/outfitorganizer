export const INPUT_USERNAME = 'INPUT_USERNAME';
export const INPUT_PASSWORD = 'INPUT_PASSWORD';
export const INPUT_CONFIRM_PASSWORD = 'INPUT_CONFIRM_PASSWORD';

export function inputUsername(username) {
	return {
		type: INPUT_USERNAME,
		username,
	};
}

export function inputPassword(password) {
	return {
		type: INPUT_PASSWORD,
		password,
	};
}

export function inputConfirmPassword(password) {
	return {
		type: INPUT_CONFIRM_PASSWORD,
		password,
	};
}
