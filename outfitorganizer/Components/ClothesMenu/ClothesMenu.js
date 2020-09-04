import React from 'react';
import {
	View,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	AsyncStorage,
	Modal,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
} from 'react-native';
import Clothes from '../Clothes/Clothes';
import OutfitCamera from '../OutfitCamera/OutfitCamera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as constants from '../../constants';
import styles from './ClothesMenuStyles';
import { connect } from 'react-redux';
import {
	fetchClothes,
	clearClothesInputs,
	inputClothesContents,
	inputClothesName,
	inputClothesDescription,
} from '../../Actions/clothesActions';
import { toggleAddClothesModal, toggleCameraModal } from '../../Actions/modalActions';

class ClothesMenu extends React.Component {
	updateClothes = async (updatedClothes) => {
		const { fetchClothes } = this.props;
		const token = await AsyncStorage.getItem('@token');
		await fetch(`${constants.API_ADDRESS}/clothes/${updatedClothes.id}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedClothes),
		});
		fetchClothes();
	};

	deleteClothes = async (clothesId) => {
		const { fetchClothes } = this.props;
		const token = await AsyncStorage.getItem('@token');
		await fetch(`${constants.API_ADDRESS}/clothes/${clothesId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		fetchClothes();
	};

	renderCameraModal = () => {
		const { isCameraModalVisible, toggleCameraModal } = this.props;
		return (
			<Modal animationType='fade' transparent={true} visible={isCameraModalVisible}>
				<OutfitCamera
					closeModal={() => toggleCameraModal(false)}
					takePicture={this.takePicture}
				/>
			</Modal>
		);
	};

	renderAddClothesModal = () => {
		const {
			contents,
			isAddClothesModalVisible,
			toggleAddClothesModal,
			clearClothesInputs,
			inputClothesName,
			inputClothesDescription,
			toggleCameraModal,
		} = this.props;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType='slide'
					transparent={true}
					visible={isAddClothesModalVisible}>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						accessible={false}>
						<View style={{ backgroundColor: 'white', flex: 1 }}>
							<TouchableOpacity
								onPress={() => {
									toggleAddClothesModal(false);
									clearClothesInputs();
								}}
								style={styles.closeButton}>
								<Icon
									style={styles.closeButtonIcon}
									size={40}
									name='close'
									color='#CCC'></Icon>
							</TouchableOpacity>
							<View style={{ marginTop: '10%', flex: 1 }}>
								<Text style={styles.newItemTitle}>New Item</Text>
								<TextInput
									keyboardAppearance={'dark'}
									placeholder='Item Name'
									style={[styles.textbox, { flex: 1 }]}
									onChangeText={(text) =>
										inputClothesName(text)
									}></TextInput>
								<TextInput
									keyboardAppearance={'dark'}
									placeholder='Item Description'
									style={[styles.textbox, { flex: 2 }]}
									multiline={true}
									onChangeText={(text) =>
										inputClothesDescription(text)
									}></TextInput>
								<View style={styles.cameraContainer}>
									<TouchableOpacity
										style={{
											flex: 1,
											justifyContent: 'center',
										}}
										onPress={() => toggleCameraModal(true)}>
										{contents === null ? (
											<Text style={styles.cameraContentText}>
												Add Image
											</Text>
										) : (
											<Image
												style={{ flex: 1 }}
												source={{
													uri:
														'data:image/jpg;base64,' +
														contents.base64,
												}}></Image>
										)}
									</TouchableOpacity>
								</View>
								<View style={{ flex: 0.5 }}></View>
								{this.renderCameraModal()}
								<TouchableOpacity
									style={styles.addClothesButton}
									onPress={this.addNewClothes}>
									<Text style={styles.addClothesText}>
										Add New Item
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	};

	renderClothes = () => {
		const { clothes } = this.props;
		return clothes.map((clothes, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}>
					<Clothes
						clothes={clothes}
						updateClothes={this.updateClothes}
						deleteClothes={this.deleteClothes}
						viewOnly={false}></Clothes>
				</View>
			);
		});
	};

	takePicture = (contents) => {
		const { inputClothesContents } = this.props;
		inputClothesContents(contents);
	};

	addNewClothes = async () => {
		const {
			name,
			description,
			contents,
			fetchClothes,
			clearClothesInputs,
			toggleAddClothesModal,
		} = this.props;
		if (!name || !description || !contents) {
			alert('At least one of the fields is missing');
			return;
		}
		try {
			const token = await AsyncStorage.getItem('@token');
			let newClothes = { name, description, path: contents.base64 };
			const response = await fetch(`${constants.API_ADDRESS}/clothes`, {
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newClothes),
			});
			const data = await response.json();
			newClothes.path = data.path;
			fetchClothes();
		} catch (error) {
			alert('An item with this name already exists');
		}
		clearClothesInputs();
		toggleAddClothesModal(false);
	};

	render() {
		const { toggleAddClothesModal } = this.props;
		return (
			<View style={{ flex: 1 }}>
				{this.renderAddClothesModal()}
				<ScrollView>
					<View>{this.renderClothes()}</View>
				</ScrollView>
				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 10,
						left: Dimensions.get('window').width / 2 - 25,
						zIndex: 1,
					}}
					onPress={() => toggleAddClothesModal(true)}>
					<Icon
						style={{
							borderWidth: 1,
							borderRadius: 20,
							borderColor: '#CCC',
						}}
						size={50}
						name='add'
						color='#CCC'></Icon>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	isAddClothesModalVisible: state.modal.isAddClothesModalVisible,
	isCameraModalVisible: state.modal.isCameraModalVisible,
	...state.clothes,
});

const mapDispatchToProps = (dispatch) => ({
	fetchClothes: () => dispatch(fetchClothes()),
	toggleAddClothesModal: (value) => dispatch(toggleAddClothesModal(value)),
	toggleCameraModal: (value) => dispatch(toggleCameraModal(value)),
	clearClothesInputs: () => dispatch(clearClothesInputs()),
	inputClothesName: (name) => dispatch(inputClothesName(name)),
	inputClothesContents: (contents) => dispatch(inputClothesContents(contents)),
	inputClothesDescription: (description) =>
		dispatch(inputClothesDescription(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClothesMenu);
