import {
	RECEIVE_CLOTHES,
	INPUT_CLOTHES_CONTENTS,
	INPUT_CLOTHES_DESCRIPTION,
	INPUT_CLOTHES_NAME,
	CLEAR_CLOTHES_INPUTS,
} from '../Actions/clothesActions';

const defaultClothesState = {
	clothes: [],
	name: '',
	description: '',
	contents: null,
};

export default function (state = defaultClothesState, action) {
	switch (action.type) {
		case RECEIVE_CLOTHES:
			return { ...state, clothes: action.clothes };
		case INPUT_CLOTHES_NAME:
			return { ...state, name: action.name };
		case INPUT_CLOTHES_DESCRIPTION:
			return { ...state, description: action.description };
		case INPUT_CLOTHES_CONTENTS:
			return { ...state, contents: action.contents };
		case CLEAR_CLOTHES_INPUTS:
			return { ...state, name: '', description: '', contents: null };
		default:
			return state;
	}
}
