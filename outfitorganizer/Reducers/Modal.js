import {
	TOGGLE_ADD_CLOTHES_MODAL,
	TOGGLE_EDIT_OUTFIT_MODAL,
	TOGGLE_ADD_OUTFIT_MODAL,
	TOGGLE_CAMERA_MODAL,
} from '../Actions/modalActions';

let defaultModalState = {
	isAddOutfitModalVisible: false,
	isEditOutfitModalVisible: false,
	isAddClothesModalVisible: false,
	isCameraModalVisible: false,
};

export default function (state = defaultModalState, action) {
	switch (action.type) {
		case TOGGLE_ADD_OUTFIT_MODAL:
			return { ...state, isAddOutfitModalVisible: action.value };
		case TOGGLE_ADD_CLOTHES_MODAL:
			return { ...state, isAddClothesModalVisible: action.value };
		case TOGGLE_EDIT_OUTFIT_MODAL:
			return { ...state, isEditOutfitModalVisible: action.value };
		case TOGGLE_CAMERA_MODAL:
			return { ...state, isCameraModalVisible: action.value };
		default:
			return state;
	}
}
