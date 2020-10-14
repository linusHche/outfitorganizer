import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	textbox: {
		fontSize: 15,
		borderBottomWidth: 2,
		marginVertical: '5%',
		marginHorizontal: 10,
	},
	closeButton: {
		zIndex: 1,
		position: 'absolute',
		right: '5%',
		top: '5%',
	},
	closeButtonIcon: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#CCC',
	},
	newItemTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 30,
	},
	cameraContainer: {
		overflow: 'hidden',
		borderWidth: 2,
		borderRadius: 10,
		flex: 4,
		marginHorizontal: 5,
	},
	cameraContentText: {
		textAlign: 'center',
		justifyContent: 'center',
	},
	addClothesButton: {
		flex: 1,
		borderWidth: 2,
		marginHorizontal: 5,
		borderRadius: 10,
		justifyContent: 'center',
		marginBottom: 5,
	},
	addClothesText: {
		textAlign: 'center',
	},
});
