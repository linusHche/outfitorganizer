import React from 'react';
import {
	View,
	AsyncStorage,
	ScrollView,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
	TextInput,
	Text,
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Outfit from '../Outfit/Outfit';
import styles from './OutfitMenuStyles';
import * as constants from '../../constants';

export default class OutfitMenu extends React.Component {
	state = {
		name: '',
		selectedOutfitId: null,
		isAddOutfitModalVisible: false,
		isEditOutfitModalVisible: false,
		isAddClothesModalVisible: false,
		allClothes: [],
		addedClothes: [],
		outfits: [],
	};

	componentDidMount() {
		this.fetchAllClothes();
		this.fetchOutfits();
	}

	fetchOutfits = async () => {
		const token = await AsyncStorage.getItem('@token');
		const response = await fetch(`${constants.API_ADDRESS}/outfit`, {
			headers: {
				Authorization: token,
			},
		});
		const value = await response.json();
		await this.setState({ outfits: value.outfits });
	};

	fetchAllClothes = async () => {
		const token = await AsyncStorage.getItem('@token');
		const response = await fetch(`${constants.API_ADDRESS}/clothes`, {
			headers: {
				Authorization: token,
			},
		});
		const value = await response.json();
		this.setState({ allClothes: value.clothes });
	};

	addClothes = (clothes) => {
		this.setState((state, props) => ({
			addedClothes: [...state.addedClothes, clothes],
			isAddClothesModalVisible: false,
		}));
	};

	renderAllClothes = () => {
		return this.renderClothes(this.state.allClothes, this.addClothes);
	};

	renderAddedClothes = () => {
		return this.renderClothes(this.state.addedClothes);
	};

	renderClothes = (clothes, handlePress = null) => {
		return clothes.map((clothes, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}
				>
					{!handlePress ? (
						<TouchableOpacity style={{ position: 'absolute', zIndex: 2 }} onPress={() => this.removeClothes(index)}>
							<Icon size={25} name='close' color='#CCC'></Icon>
						</TouchableOpacity>
					) : null}
					<Clothes style={{ zIndex: 1 }} clothes={clothes} handlePress={handlePress}></Clothes>
				</View>
			);
		});
	};

	removeClothes = (index) => {
		let restClothes = [...this.state.addedClothes];
		restClothes.splice(index, 1);
		this.setState({ addedClothes: restClothes });
	};

	createOutfit = async () => {
		const token = await AsyncStorage.getItem('@token');
		let newOutfit = {
			name: this.state.name,
			description: '',
			combinations: this.state.addedClothes.map((value, index) => {
				return {
					clothesid: value.id,
					level: index,
				};
			}),
		};
		await fetch(`${constants.API_ADDRESS}/outfit`, {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newOutfit),
		});
		await this.toggleAddOutfitModal(false);
		await this.setState({ name: '', addedClothes: [] });
		await this.fetchOutfits();
	};

	updateOutfit = async () => {
		const outfitId = this.state.selectedOutfitId;
		const token = await AsyncStorage.getItem('@token');
		let updatedOutfit = {
			name: this.state.name,
			description: '',
			combinations: this.state.addedClothes.map((value, index) => {
				return {
					clothesid: value.id,
					level: index,
				};
			}),
		};
		await fetch(`${constants.API_ADDRESS}/outfit/${outfitId}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedOutfit),
		});
		await this.handleOutfitChange();
	};

	deleteOutfit = async () => {
		const outfitId = this.state.selectedOutfitId;
		const token = await AsyncStorage.getItem('@token');
		await fetch(`${constants.API_ADDRESS}/outfit/${outfitId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		await this.handleOutfitChange();
	};

	handleOutfitChange = async () => {
		await this.toggleEditOutfitModal(false);
		await this.setState({ name: '', addedClothes: [], selectedOutfitId: null });
		await this.fetchOutfits();
	};

	renderSharedOutfitModal = (title, handleSave) => {
		return (
			<View style={{ marginTop: '10%', flex: 1 }}>
				<Text style={styles.newOutfitTitle}>{title}</Text>
				<TextInput
					keyboardAppearance={'dark'}
					placeholder='Outfit Name'
					value={this.state.name}
					style={[styles.textbox, { flex: 1 }]}
					onChangeText={(text) => this.setState({ name: text })}
				></TextInput>
				<View style={{ flex: 8 }}>
					<Text style={{ textAlign: 'center', fontSize: 25 }}>Layers</Text>
					<ScrollView style={{ borderColor: 'light gray', borderLeftWidth: 1, borderRightWidth: 1, marginHorizontal: 5 }}>
						<View style={{ flex: 1 }}>{this.renderAddedClothes()}</View>
					</ScrollView>
				</View>
				<View style={{ flex: 1 }}></View>
				<TouchableOpacity style={styles.addNewClothesBtn} onPress={() => this.toggleAddClothesModal(true)}>
					<Text style={{ textAlign: 'center' }}>Add New Clothes</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.addNewClothesBtn} onPress={handleSave}>
					<Text style={{ textAlign: 'center' }}>Save Outfit</Text>
				</TouchableOpacity>
				{this.renderAddClothesModal()}
			</View>
		);
	};
	renderAddOutfitModal = () => {
		const { isAddOutfitModalVisible } = this.state;
		return (
			<View style={{ marginTop: 22, zIndex: 2 }}>
				<Modal animationType='slide' transparent={true} visible={isAddOutfitModalVisible}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						<View style={{ backgroundColor: 'white', flex: 1 }}>
							<TouchableOpacity
								onPress={() => {
									this.toggleAddOutfitModal(false);
								}}
								style={styles.closeButton}
							>
								<Icon style={styles.closeButtonIcon} size={40} name='close' color='#CCC'></Icon>
							</TouchableOpacity>
							{this.renderSharedOutfitModal('New Outfit', this.createOutfit)}
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	};

	renderEditOutfitModal = () => {
		let { isEditOutfitModalVisible } = this.state;
		return (
			<Modal animationType='slide' transparent={true} visible={isEditOutfitModalVisible}>
				<View
					style={{
						backgroundColor: 'white',
						flex: 1,
					}}
				>
					<TouchableOpacity style={styles.closeButton} onPress={() => this.toggleEditOutfitModal(false)}>
						<Icon style={styles.closeButtonIcon} size={40} name='close' color='#CCC'></Icon>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
								{ text: 'Confirm', onPress: this.deleteOutfit },
								{ text: 'Cancel' },
							])
						}
						style={styles.deleteButton}
					>
						<Icon size={40} name='delete' color='red'></Icon>
					</TouchableOpacity>
					{this.renderSharedOutfitModal('Edit Outfit', () => this.updateOutfit())}
				</View>
			</Modal>
		);
	};

	renderAddClothesModal = () => {
		return (
			<View style={{ marginTop: 22 }}>
				<Modal animationType='slide' transparent={false} visible={this.state.isAddClothesModalVisible}>
					<TouchableOpacity
						onPress={() => {
							this.toggleAddClothesModal(false);
						}}
						style={styles.closeButton}
					>
						<Icon style={styles.closeButtonIcon} size={40} name='close' color='#CCC'></Icon>
					</TouchableOpacity>
					<View style={{ marginTop: '10%', flex: 1 }}>
						<Text style={styles.newOutfitTitle}>Your Clothes</Text>
						<View style={{ flex: 6 }}>
							<ScrollView style={{ marginHorizontal: 5 }}>
								<View style={{ flex: 1 }}>{this.renderAllClothes()}</View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			</View>
		);
	};

	toggleAddOutfitModal = async (value) => {
		this.setState({ isAddOutfitModalVisible: value });
	};

	toggleAddClothesModal = async (value) => {
		this.setState({ isAddClothesModalVisible: value });
	};

	toggleEditOutfitModal = async (value) => {
		this.setState({ isEditOutfitModalVisible: value });
	};

	onPressOutfit = (outfitId) => {
		this.toggleEditOutfitModal(true);
		this.setState({ selectedOutfitId: outfitId });
		const selectedOutfit = this.state.outfits.filter((x) => x.id == outfitId)[0];
		console.log(selectedOutfit);
		const outfitClothes = this.state.allClothes.filter((clothes) => {
			return selectedOutfit.clothesId.includes(clothes.id);
		});
		this.setState({ addedClothes: outfitClothes, name: selectedOutfit.name });
	};

	onHandleClose = () => {
		this.setState({ name: '', addedClothes: [] });
	};

	renderOutfits = () => {
		return this.state.outfits.map((outfit, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}
				>
					<Outfit onPressModal={this.onPressOutfit} outfit={outfit} onHandleClose />
				</View>
			);
		});
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.renderAddOutfitModal()}
				{this.renderEditOutfitModal()}
				<ScrollView>
					<View>{this.renderOutfits()}</View>
				</ScrollView>
				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 10,
						left: Dimensions.get('window').width / 2 - 25,
						zIndex: 1,
					}}
					onPress={() => this.toggleAddOutfitModal(true)}
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
