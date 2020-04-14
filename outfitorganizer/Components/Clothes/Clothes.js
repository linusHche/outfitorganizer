import React, { useState } from 'react';
import { View, TextInput, Text, Image, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './ClothesStyles';

export default Clothes = ({ clothes, updateClothes }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(clothes.name);
	const [description, setDescription] = useState(clothes.description);

	const handleCloseAndUpdate = () => {
		setModalVisible(false);
		updateClothes({ id: clothes.id, name, description, path: clothes.path });
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
					<View style={{ flex: 1 }}>
						<View style={{ flex: 1 }}></View>
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
					</View>
				</View>
			</Modal>
		);
	};

	return (
		<TouchableOpacity style={styles.clothesEditButton} onPress={() => setModalVisible(true)}>
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
