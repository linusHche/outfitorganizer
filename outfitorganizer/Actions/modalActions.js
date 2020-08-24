export const TOGGLE_ADD_CLOTHES_MODAL = 'TOGGLE_ADDCLOTHES_MODAL';
export const TOGGLE_EDIT_OUTFIT_MODAL = 'TOGGLE_EDIT_OUTFIT_MODAL';
export const TOGGLE_ADD_OUTFIT_MODAL = 'TOGGLE_ADD_OUTFIT_MODAL';
export const TOGGLE_CAMERA_MODAL = 'TOGGLE_CAMERA_MODAL';

export function toggleAddClothesModal(value) {
	return {
		type: TOGGLE_ADD_CLOTHES_MODAL,
		value,
	};
}

export function toggleEditOutfitModal(value) {
	return {
		type: TOGGLE_EDIT_OUTFIT_MODAL,
		value,
	};
}

export function toggleAddOutfitModal(value) {
	return {
		type: TOGGLE_ADD_OUTFIT_MODAL,
		value,
	};
}

export function toggleCameraModal(value) {
	return {
		type: TOGGLE_CAMERA_MODAL,
		value,
	};
}
