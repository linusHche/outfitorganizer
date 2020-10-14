import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	closeButton: {
		zIndex: 1,
		position: 'absolute',
		right: '5%',
		top: '5%',
	},
	deleteButton: {
		zIndex: 1,
		position: 'absolute',
		left: '5%',
		top: '5%',
	},
	closeButtonIcon: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#CCC',
	},
	textbox: {
		fontSize: 15,
		borderBottomWidth: 2,
		marginHorizontal: 10,
		marginBottom: 10,
	},
	newOutfitTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 30,
	},

	addNewClothesBtn: {
		flex: 1,
		justifyContent: 'center',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 20,
		marginBottom: 5,
	},
});
