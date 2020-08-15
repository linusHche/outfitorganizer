import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import styles from './OutfitStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default Outfit = ({ outfit, children, onPressModal, onhandleClose }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	let name = outfit.name;

	return (
		<TouchableOpacity
			style={styles.outfitEditButton}
			onPress={() => {
				onPressModal(outfit.id);
			}}
		>
			<Text>{name}</Text>
		</TouchableOpacity>
	);
};
