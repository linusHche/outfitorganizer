import * as constants from './constants';
import { AsyncStorage } from 'react-native';
export async function fetchData(address) {
	const token = await AsyncStorage.getItem('@token');
	const response = await fetch(`${constants.API_ADDRESS}/${address}`, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	const value = await response.json();
	return value;
}

export async function sendData(type, address, body) {
	const token = await AsyncStorage.getItem('@token');
	await fetch(`${constants.API_ADDRESS}/${address}`, {
		method: type,
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}
