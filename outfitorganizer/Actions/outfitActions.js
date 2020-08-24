import { fetchData } from '../util';
export const ADD_CLOTHES_TO_OUTFIT = 'ADD_CLOTHES_TO_OUTFIT';
export const REMOVE_CLOTHES_FROM_OUTFIT = 'REMOVE_CLOTHES_FROM_OUTFIT';
export const INPUT_OUTFIT_NAME = 'INPUT_OUTFIT_NAME';
export const FETCH_OUTFITS = 'FETCH_OUTFITS';
export const RECEIVE_OUTFITS = 'RECEIVE_OUTFITS';
export const CLEAR_TEMPLATE = 'CLEAR_TEMPLATE';
export const SELECT_OUTFIT = 'SELECT_OUTFIT';

export function addClothesToOutfit(clothes) {
	return {
		type: ADD_CLOTHES_TO_OUTFIT,
		clothes,
	};
}

export function removeClothesFromOutfit(index) {
	return {
		type: REMOVE_CLOTHES_FROM_OUTFIT,
		index,
	};
}

export function inputOutfitName(name) {
	return {
		type: INPUT_OUTFIT_NAME,
		name,
	};
}

export function receiveOutfits(outfits) {
	return {
		type: RECEIVE_OUTFITS,
		outfits,
	};
}

export function fetchOutfits() {
	return function (dispatch) {
		return fetchData('outfit').then((res) => {
			dispatch(receiveOutfits(res.outfits));
		});
	};
}

export function clearClothesTemplate() {
	return {
		type: CLEAR_TEMPLATE,
	};
}

export function selectOutfit(outfitId) {
	return {
		type: SELECT_OUTFIT,
		outfitId,
	};
}
