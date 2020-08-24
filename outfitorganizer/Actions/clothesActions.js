import { fetchData } from '../util';
export const FETCH_CLOTHES = 'FETCH_CLOTHES';
export const RECEIVE_CLOTHES = 'RECEIVE_CLOTHES';
export const INPUT_CLOTHES_NAME = 'INPUT_CLOTHES_NAME';
export const INPUT_CLOTHES_CONTENTS = 'INPUT_CLOTHES_CONTENTS';
export const INPUT_CLOTHES_DESCRIPTION = 'INPUT_CLOTHES_DESCRIPTION';
export const CLEAR_CLOTHES_INPUTS = 'CLEAR_CLOTHES_INPUTS';

export function fetchClothes() {
	return function (dispatch) {
		return fetchData('clothes').then((res) => {
			dispatch(receiveClothes(res.clothes));
		});
	};
}

export function receiveClothes(clothes) {
	return {
		type: RECEIVE_CLOTHES,
		clothes,
	};
}

export function inputClothesName(name) {
	return {
		type: INPUT_CLOTHES_NAME,
		name,
	};
}

export function inputClothesContents(contents) {
	return {
		type: INPUT_CLOTHES_CONTENTS,
		contents,
	};
}

export function inputClothesDescription(description) {
	return {
		type: INPUT_CLOTHES_DESCRIPTION,
		description,
	};
}

export function clearClothesInputs() {
	return {
		type: CLEAR_CLOTHES_INPUTS,
	};
}
