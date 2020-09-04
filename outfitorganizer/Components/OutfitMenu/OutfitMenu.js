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
import Clothes from '../Clothes/Clothes';
import { connect } from 'react-redux';
import {
	toggleAddClothesModal,
	toggleAddOutfitModal,
	toggleEditOutfitModal,
} from '../../Actions/modalActions';
import {
	fetchOutfits,
	addClothesToOutfit,
	removeClothesFromOutfit,
	inputOutfitName,
	clearClothesTemplate,
	selectOutfit,
} from '../../Actions/outfitActions';
import { fetchClothes } from '../../Actions/clothesActions';

class OutfitMenu extends React.Component {
	componentDidMount() {
		const { fetchOutfits, fetchClothes } = this.props;
		fetchClothes();
		fetchOutfits();
	}

	renderAllClothes = () => {
		let { addClothesToOutfit, allClothes, toggleAddClothesModal } = this.props;
		const AddClothesAndClose = (clothes) => {
			addClothesToOutfit(clothes);
			toggleAddClothesModal(false);
		};
		return this.renderClothes(allClothes, AddClothesAndClose);
	};

	renderAddedClothes = () => {
		const { clothesTemplate } = this.props;
		return this.renderClothes(clothesTemplate.addedClothes);
	};

	renderClothes = (clothesToRender, handlePress = null) => {
		const { removeClothesFromOutfit } = this.props;
		return clothesToRender.map((clothes, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}>
					{!handlePress ? (
						<TouchableOpacity
							style={{ position: 'absolute', zIndex: 2 }}
							onPress={() => removeClothesFromOutfit(index)}>
							<Icon size={25} name='close' color='#CCC'></Icon>
						</TouchableOpacity>
					) : null}
					<Clothes
						style={{ zIndex: 1 }}
						clothes={clothes}
						handlePress={handlePress}></Clothes>
				</View>
			);
		});
	};

	createOutfit = async () => {
		const token = await AsyncStorage.getItem('@token');
		const {
			clothesTemplate,
			toggleAddOutfitModal,
			clearClothesTemplate,
			fetchOutfits,
		} = this.props;
		let newOutfit = {
			name: clothesTemplate.name,
			description: '',
			combinations: clothesTemplate.addedClothes.map((value, index) => {
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
		toggleAddOutfitModal(false);
		clearClothesTemplate();
		fetchOutfits();
	};

	updateOutfit = async () => {
		const { selectedOutfitId, clothesTemplate } = this.props;
		const token = await AsyncStorage.getItem('@token');
		let updatedOutfit = {
			name: clothesTemplate.name,
			description: '',
			combinations: clothesTemplate.addedClothes.map((value, index) => {
				return {
					clothesid: value.id,
					level: index,
				};
			}),
		};
		await fetch(`${constants.API_ADDRESS}/outfit/${selectedOutfitId}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedOutfit),
		});
		this.handleOutfitChange();
	};

	deleteOutfit = async () => {
		const { selectedOutfitId } = this.props;
		const token = await AsyncStorage.getItem('@token');
		await fetch(`${constants.API_ADDRESS}/outfit/${selectedOutfitId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		this.handleOutfitChange();
	};

	handleOutfitChange = () => {
		const { toggleEditOutfitModal, clearClothesTemplate, fetchOutfits } = this.props;
		toggleEditOutfitModal(false);
		clearClothesTemplate();
		fetchOutfits();
	};

	renderSharedOutfitModal = (title, handleSave) => {
		const { inputOutfitName, toggleAddClothesModal, clothesTemplate } = this.props;
		return (
			<View style={{ marginTop: '10%', flex: 1 }}>
				<Text style={styles.newOutfitTitle}>{title}</Text>
				<TextInput
					keyboardAppearance={'dark'}
					placeholder='Outfit Name'
					value={clothesTemplate.name}
					style={[styles.textbox, { flex: 1 }]}
					onChangeText={(text) => inputOutfitName(text)}></TextInput>
				<View style={{ flex: 8 }}>
					<Text style={{ textAlign: 'center', fontSize: 25 }}>Layers</Text>
					<ScrollView
						style={{
							borderColor: 'light gray',
							borderLeftWidth: 1,
							borderRightWidth: 1,
							marginHorizontal: 5,
						}}>
						<View style={{ flex: 1 }}>{this.renderAddedClothes()}</View>
					</ScrollView>
				</View>
				<View style={{ flex: 1 }}></View>
				<TouchableOpacity
					style={styles.addNewClothesBtn}
					onPress={() => toggleAddClothesModal(true)}>
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
		const { isAddOutfitModalVisible, toggleAddOutfitModal } = this.props;
		return (
			<View style={{ marginTop: 22, zIndex: 2 }}>
				<Modal
					animationType='slide'
					transparent={true}
					visible={isAddOutfitModalVisible}>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						accessible={false}>
						<View style={{ backgroundColor: 'white', flex: 1 }}>
							<TouchableOpacity
								onPress={() => {
									toggleAddOutfitModal(false);
								}}
								style={styles.closeButton}>
								<Icon
									style={styles.closeButtonIcon}
									size={40}
									name='close'
									color='#CCC'></Icon>
							</TouchableOpacity>
							{this.renderSharedOutfitModal(
								'New Outfit',
								this.createOutfit
							)}
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	};

	renderEditOutfitModal = () => {
		const {
			isEditOutfitModalVisible,
			toggleEditOutfitModal,
			clearClothesTemplate,
		} = this.props;
		return (
			<Modal
				animationType='slide'
				transparent={true}
				visible={isEditOutfitModalVisible}>
				<View
					style={{
						backgroundColor: 'white',
						flex: 1,
					}}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => {
							clearClothesTemplate();
							toggleEditOutfitModal(false);
						}}>
						<Icon
							style={styles.closeButtonIcon}
							size={40}
							name='close'
							color='#CCC'></Icon>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Alert.alert(
								'Confirm Delete',
								'Are you sure you want to delete this item?',
								[
									{ text: 'Confirm', onPress: this.deleteOutfit },
									{ text: 'Cancel' },
								]
							)
						}
						style={styles.deleteButton}>
						<Icon size={40} name='delete' color='red'></Icon>
					</TouchableOpacity>
					{this.renderSharedOutfitModal('Edit Outfit', this.updateOutfit)}
				</View>
			</Modal>
		);
	};

	renderAddClothesModal = () => {
		const { isAddClothesModalVisible, toggleAddClothesModal } = this.props;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType='slide'
					transparent={false}
					visible={isAddClothesModalVisible}>
					<TouchableOpacity
						onPress={() => {
							toggleAddClothesModal(false);
						}}
						style={styles.closeButton}>
						<Icon
							style={styles.closeButtonIcon}
							size={40}
							name='close'
							color='#CCC'></Icon>
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

	onPressOutfit = (outfitId) => {
		const {
			toggleEditOutfitModal,
			selectOutfit,
			addClothesToOutfit,
			inputOutfitName,
			clearClothesTemplate,
			outfits,
			allClothes,
		} = this.props;
		toggleEditOutfitModal(true);
		selectOutfit(outfitId);
		const selectedOutfit = outfits.filter((x) => x.id == outfitId)[0];
		// console.log(selectedOutfit);
		const outfitClothes = selectedOutfit.clothesIds.map((id) => {
			return allClothes.filter((clothes) => clothes.id === id)[0];
		});
		// allClothes.filter((clothes) => {
		// 	return selectedOutfit.clothesId.includes(clothes.id);
		// });
		clearClothesTemplate();
		inputOutfitName(selectedOutfit.name);
		outfitClothes.forEach((clothes) => {
			addClothesToOutfit(clothes);
		});
	};

	renderOutfits = () => {
		const { outfits, clearClothesTemplate } = this.props;
		return outfits.map((outfit, index) => {
			return (
				<View
					key={index}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8,
					}}>
					<Outfit
						onPressModal={this.onPressOutfit}
						outfit={outfit}
						onHandleClose={clearClothesTemplate}
					/>
				</View>
			);
		});
	};

	render() {
		const { toggleAddOutfitModal } = this.props;
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
					onPress={() => toggleAddOutfitModal(true)}>
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
	isAddOutfitModalVisible: state.modal.isAddOutfitModalVisible,
	isEditOutfitModalVisible: state.modal.isEditOutfitModalVisible,
	isAddClothesModalVisible: state.modal.isAddClothesModalVisible,
	allClothes: state.clothes.clothes,
	...state.outfit,
});

const mapDispatchToProps = (dispatch) => ({
	toggleAddClothesModal: (value) => dispatch(toggleAddClothesModal(value)),
	toggleAddOutfitModal: (value) => dispatch(toggleAddOutfitModal(value)),
	toggleEditOutfitModal: (value) => dispatch(toggleEditOutfitModal(value)),
	addClothesToOutfit: (clothes) => dispatch(addClothesToOutfit(clothes)),
	removeClothesFromOutfit: (clothesId) => dispatch(removeClothesFromOutfit(clothesId)),
	inputOutfitName: (name) => dispatch(inputOutfitName(name)),
	fetchOutfits: () => dispatch(fetchOutfits()),
	clearClothesTemplate: () => dispatch(clearClothesTemplate()),
	selectOutfit: (outfitId) => dispatch(selectOutfit(outfitId)),
	fetchClothes: () => dispatch(fetchClothes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutfitMenu);
