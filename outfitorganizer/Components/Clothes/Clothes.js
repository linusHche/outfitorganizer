import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { DROPBOX_ACCESS_TOKEN } from '../../constants';
import { Dropbox } from 'dropbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
const dbx = new Dropbox({
	accessToken: DROPBOX_ACCESS_TOKEN,
	fetch,
});

export default Clothes = ({ clothes }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [img, setImg] = useState(null);

	const renderModal = () => {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
			>
				<View
					style={{
						backgroundColor: 'white',
						flex: 1,
					}}
				>
					<TouchableOpacity
						style={{
							zIndex: 1,
							position: 'absolute',
							right: '5%',
							top: '5%',
						}}
						onPress={() => setModalVisible(false)}
					>
						<Icon
							style={{
								borderWidth: 1,
								borderRadius: 20,
								borderColor: '#CCC',
							}}
							size={40}
							name="close"
							color="#CCC"
						></Icon>
					</TouchableOpacity>
					<View></View>
					<Text>test</Text>
				</View>
			</Modal>
		);
	};

	return (
		<TouchableOpacity
			style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
			onPress={() => setModalVisible(true)}
		>
			{renderModal()}
			<View style={{ flex: 1 }}>
				<Text style={{ marginLeft: 10 }}>{clothes.name}</Text>
				<Text style={{ marginLeft: 10 }}>{clothes.description}</Text>
			</View>
			<Image
				style={{
					width: '25%',
					height: '100%',
					borderWidth: 1,
					borderRadius: 5,
					borderColor: '#CCC',
				}}
				source={{
					uri: clothes.path,
				}}
			/>
		</TouchableOpacity>
	);
};
