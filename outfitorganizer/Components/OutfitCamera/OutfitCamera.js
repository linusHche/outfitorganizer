import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Platform, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OutfitCamera(props) {
	const [camera, setCamera] = useState(null);
	useEffect(() => {
		(async () => {
			await Camera.requestPermissionsAsync();
		})();
	}, []);

	const takePhoto = async () => {
		if (camera)
			var data = await camera.takePictureAsync({
				quality: 0.5,
				base64: true,
			});
		let contents = {
			uri: Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri,
			name: 'picture.jpg',
			type: 'image/jpg',
			base64: data.base64,
		};
		props.takePicture(contents);
		props.closeModal();
	};

	return (
		<View style={{ flex: 1 }}>
			<Camera
				style={{ flex: 1, justifyContent: 'space-between' }}
				ref={(ref) => {
					setCamera(ref);
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row',
					}}
				>
					<TouchableOpacity style={{ position: 'absolute', right: '5%', top: '5%' }} onPress={props.closeModal}>
						<Icon
							style={{
								borderWidth: 1,
								borderRadius: 20,
								borderColor: '#CCC',
							}}
							size={40}
							name='close'
							color='#CCC'
						></Icon>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							bottom: 40,
							position: 'absolute',
							left: Dimensions.get('window').width / 2 - 40,
						}}
						onPress={() => takePhoto()}
					>
						<Icon
							style={{
								borderRadius: 20,
								borderColor: '#CCC',
							}}
							size={80}
							color='#CCC'
						>
							blur_circular
						</Icon>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}
