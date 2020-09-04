import {
	CLEAR_TEMPLATE,
	ADD_CLOTHES_TO_OUTFIT,
	REMOVE_CLOTHES_FROM_OUTFIT,
	INPUT_OUTFIT_NAME,
	RECEIVE_OUTFITS,
	SELECT_OUTFIT,
} from '../Actions/outfitActions';

let defaultOutfitState = {
	clothesTemplate: {
		name: '',
		addedClothes: [],
	},
	selectedOutfitId: null,
	outfits: [],
};

function removeClothesFromOutfit(state, index) {
	let clothesTemplate = state.clothesTemplate;
	let addedClothes = [...clothesTemplate.addedClothes];

	addedClothes.splice(index, 1);
	clothesTemplate = { ...clothesTemplate, addedClothes };

	return { ...state, clothesTemplate };
}

function addClothesToOutfit(state, clothes) {
	let clothesTemplate = state.clothesTemplate;
	let addedClothes = [...clothesTemplate.addedClothes];

	addedClothes = [...addedClothes, clothes];
	clothesTemplate = { ...clothesTemplate, addedClothes };
	return { ...state, clothesTemplate };
}

function clearClothesTemplate(state) {
	let newState = { ...state, clothesTemplate: defaultOutfitState.clothesTemplate };
	return newState;
}

function inputOutfitName(state, name) {
	let clothesTemplate = state.clothesTemplate;
	clothesTemplate = { ...clothesTemplate, name };
	return { ...state, clothesTemplate };
}

export default function (state = defaultOutfitState, action) {
	switch (action.type) {
		case ADD_CLOTHES_TO_OUTFIT:
			return addClothesToOutfit(state, action.clothes);
		case REMOVE_CLOTHES_FROM_OUTFIT:
			return removeClothesFromOutfit(state, action.index);
		case INPUT_OUTFIT_NAME:
			return inputOutfitName(state, action.name);
		case RECEIVE_OUTFITS:
			return { ...state, outfits: action.outfits };
		case CLEAR_TEMPLATE:
			return clearClothesTemplate(state);
		case SELECT_OUTFIT:
			return { ...state, selectedOutfitId: action.outfitId };
		default:
			return state;
	}
}
