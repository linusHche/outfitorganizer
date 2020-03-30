import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	Modal,
	Button,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import { API_ADDRESS, DROPBOX_ACCESS_TOKEN } from '../../constants';
import { Dropbox } from 'dropbox';
const dbx = new Dropbox({
	accessToken: DROPBOX_ACCESS_TOKEN,
	fetch
});

const url = '';
export default Clothes = () => {
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
						borderRadius: 20,
						margin: 22,
						flex: 1,
						borderWidth: 2
					}}
				>
					<TouchableOpacity onPress={() => setModalVisible(false)}>
						<Text
							style={{
								fontSize: 35,
								textAlign: 'right',
								marginRight: 10
							}}
						>
							x
						</Text>
					</TouchableOpacity>
					<View></View>
					<Image style={{ flex: 1 }} source={{ uri: url }} />
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
				<Text style={{ marginLeft: 10 }}>Red Hoodie</Text>
				<Text style={{ marginLeft: 10 }}>Description</Text>
			</View>
			<Image
				style={{
					width: '25%',
					height: '100%',
					borderWidth: 1,
					borderRadius: 5,
					borderColor: '#CCC'
				}}
				source={{
					uri: url
				}}
			/>
		</TouchableOpacity>
	);
};
