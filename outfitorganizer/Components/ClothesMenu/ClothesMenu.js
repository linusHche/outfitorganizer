import React from 'react';
import {
	View,
	Dimensions,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	AsyncStorage,
	Modal,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	StatusBar,
	Image,
} from 'react-native';
import Clothes from '../Clothes/Clothes';
import OutfitCamera from '../OutfitCamera/OutfitCamera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as constants from '../../constants';
import styles from './ClothesMenuStyles';
export default class ClothesMenu extends React.Component {
	state = {
		loaded: false,
		isAddClothesModalVisible: false,
		isCameraModalVisible: false,
		clothes: [],
		contents: null,
		name: '',
		description: '',
	};

	componentDidMount() {
		this.fetchClothes();
	}

	fetchImages = async () => {};

	fetchClothes = async () => {
		const token = await AsyncStorage.getItem('@token');
		const response = await fetch(`${constants.API_ADDRESS}/clothes`, {
			headers: {
				Authorization: token,
			},
		});
		const value = await response.json();
		this.setState({ clothes: value.clothes });
		await this.setState({ loaded: true });
	};

	updateClothes = async (updatedClothes) => {
		const token = await AsyncStorage.getItem('@token');
		const response = await fetch(`${constants.API_ADDRESS}/clothes/${updatedClothes.id}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedClothes),
		});
		if (response.ok) {
			let previousClothes = [...this.state.clothes];
			previousClothes = previousClothes.map((o) => (o.id === updatedClothes.id ? updatedClothes : o));
			await this.setState({ clothes: previousClothes });
		}
	};

	deleteClothes = async (clothesId) => {
		const token = await AsyncStorage.getItem('@token');
		await fetch(`${constants.API_ADDRESS}/clothes/${clothesId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		let previousClothes = [...this.state.clothes];
		previousClothes = previousClothes.filter((o) => o.id === clothesId);
		await this.setState({ clothes: previousClothes });
	};

	clearInputs = () => {
		this.setState({ contents: null, name: '', description: '' });
	};

	renderCameraModal = () => {
		return (
			<Modal animationType='fade' transparent={true} visible={this.state.isCameraModalVisible}>
				<OutfitCamera closeModal={this.toggleCameraModal} takePicture={this.takePicture} />
			</Modal>
		);
	};

	renderAddClothesModal = () => {
		const { contents, isAddClothesModalVisible } = this.state;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal animationType='slide' transparent={true} visible={isAddClothesModalVisible}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						<View style={{ backgroundColor: 'white', flex: 1 }}>
							<TouchableOpacity
								onPress={() => {
									this.toggleAddClothesModal(false);
									this.clearInputs();
								}}
								style={styles.closeButton}
							>
								<Icon style={styles.closeButtonIcon} size={40} name='close' color='#CCC'></Icon>
							</TouchableOpacity>
							<View style={{ marginTop: '10%', flex: 1 }}>
								<Text style={styles.newItemTitle}>New Item</Text>
								<TextInput
									keyboardAppearance={'dark'}
									placeholder='Item Name'
									style={[styles.textbox, { flex: 1 }]}
									onChangeText={(text) => this.setState({ name: text })}
								></TextInput>
								<TextInput
									keyboardAppearance={'dark'}
									placeholder='Item Description'
									style={[styles.textbox, { flex: 2 }]}
									multiline={true}
									onChangeText={(text) => this.setState({ description: text })}
								></TextInput>
								<View style={{ flex: 2 }}></View>
								<View style={styles.cameraContainer}>
									<TouchableOpacity
										style={{
											flex: 1,
											justifyContent: 'center',
										}}
										onPress={this.toggleCameraModal}
									>
										{contents === null ? (
											<Text style={styles.cameraContentText}>Add Image</Text>
										) : (
											<Image
												style={{ flex: 1 }}
												source={{
													uri: 'data:image/jpg;base64,' + contents.base64,
												}}
											></Image>
										)}
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1 }}></View>
								{this.renderCameraModal()}
								<TouchableOpacity style={styles.addClothesButton} onPress={this.addNewClothes}>
									<Text style={styles.addClothesText}>Add New Item</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	};

	renderClothes = () => {
		return this.state.clothes.map((clothes, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}
				>
					<Clothes clothes={clothes} updateClothes={this.updateClothes} deleteClothes={this.deleteClothes}></Clothes>
				</View>
			);
		});
	};

	toggleAddClothesModal = (value) => {
		this.setState({ isAddClothesModalVisible: value });
		if (value) StatusBar.setBarStyle('dark-content');
		else StatusBar.setBarStyle('light-content');
	};

	toggleCameraModal = () => {
		this.setState((state, props) => ({
			isCameraModalVisible: !state.isCameraModalVisible,
		}));
	};

	takePicture = (contents) => {
		this.setState({ contents });
	};

	addNewClothes = async () => {
		const { name, description, contents } = this.state;
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
			this.setState({ clothes: [...this.state.clothes, newClothes] });
		} catch (error) {
			alert('An item with this name already exists');
		}
		this.clearInputs();
		this.toggleAddClothesModal(false);
	};

	render() {
		if (this.state.loaded !== true)
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size='large' color='#CCC' />
				</View>
			);
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
					onPress={() => this.toggleAddClothesModal(true)}
				>
					<Icon
						style={{
							borderWidth: 1,
							borderRadius: 20,
							borderColor: '#CCC',
						}}
						size={50}
						name='add'
						color='#CCC'
					></Icon>
				</TouchableOpacity>
			</View>
		);
	}
}
