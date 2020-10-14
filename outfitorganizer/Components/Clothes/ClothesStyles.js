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
		marginVertical: '5%',
		marginHorizontal: 10,
		flex: 1,
	},
	image: {
		marginVertical: '10%',
		alignSelf: 'center',
		width: '90%',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#CCC',
		flex: 7,
	},
	clothesEditButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	thumbnail: {
		width: '25%',
		height: '90%',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#CCC',
	},
	clothesSaveButton: {
		flex: 1,
		justifyContent: 'center',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 20,
		marginBottom: 5,
	},
});
