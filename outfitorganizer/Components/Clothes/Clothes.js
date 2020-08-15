import React, { useState } from 'react';
import { View, TextInput, Text, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './ClothesStyles';

export default Clothes = ({ clothes, updateClothes, deleteClothes, viewOnly, handlePress }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(clothes.name);
	const [description, setDescription] = useState(clothes.description);

	const handleCloseAndUpdate = () => {
		setModalVisible(false);
		if ((clothes.name !== name || clothes.description !== description) && viewOnly === false)
			updateClothes({ id: clothes.id, previousName: clothes.name, name, description, path: clothes.path });
	};

	const handleDeleteAndClose = async () => {
		setModalVisible(false);
		if (viewOnly === false) await deleteClothes(clothes.id);
	};

	const renderModal = () => {
		return (
			<Modal animationType='slide' transparent={true} visible={isModalVisible}>
				<View
					style={{
						backgroundColor: 'white',
						flex: 1,
					}}
				>
					<TouchableOpacity style={styles.closeButton} onPress={handleCloseAndUpdate}>
						<Icon style={styles.closeButtonIcon} size={40} name='close' color='#CCC'></Icon>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
								{ text: 'Confirm', onPress: handleDeleteAndClose },
								{ text: 'Cancel' },
							])
						}
						style={styles.deleteButton}
					>
						<Icon size={40} name='delete' color='red'></Icon>
					</TouchableOpacity>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								marginTop: '10%',
								flex: 1,
								textAlign: 'center',
								fontSize: 30,
								fontFamily: 'American Typewriter',
							}}
						>
							Edit Clothes
						</Text>
						<TextInput style={styles.textbox} value={name} onChangeText={(text) => setName(text)}></TextInput>
						<TextInput
							multiline={true}
							style={styles.textbox}
							onChangeText={(text) => setDescription(text)}
							value={description}
						></TextInput>
						<Image
							style={styles.image}
							source={{
								uri: clothes.path,
							}}
						/>
						<TouchableOpacity style={styles.clothesSaveButton} onPress={handleCloseAndUpdate}>
							<Text style={{ textAlign: 'center' }}>Save Clothes</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	};

	return (
		<TouchableOpacity
			style={styles.clothesEditButton}
			onPress={() => {
				if (viewOnly === false) {
					setModalVisible(true);
				} else if (handlePress !== null) {
					handlePress(clothes);
				}
			}}
		>
			{renderModal()}
			<View style={{ flex: 1 }}>
				<Text style={{ marginLeft: 10 }}>{clothes.name}</Text>
				<Text style={{ marginLeft: 10 }}>{clothes.description}</Text>
			</View>
			<Image
				style={styles.thumbnail}
				source={{
					uri: clothes.path,
				}}
			/>
		</TouchableOpacity>
	);
};
