import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { API_ADDRESS } from './constants';

export default function App() {
	const [type, setType] = useState(Camera.Constants.Type.back);
	let camera = null;
	const takePhoto = async () => {
		if (camera) var data = await camera.takePictureAsync();

		console.log(process.env.API_ADDRESS);
		const formData = new FormData();
		formData.append('file', {
			uri: data.uri,
			name: 'picture.jpg',
			type: 'image/jpg'
		});
		const response = await fetch(`${API_ADDRESS}/api/user`);
		const value = await response.json();
		console.log(value);
	};

	return (
		<View style={{ flex: 1 }}>
			<Camera
				style={{ flex: 1 }}
				type={type}
				ref={ref => {
					camera = ref;
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row'
					}}
				>
					<TouchableOpacity
						style={{
							flex: 0.1,
							alignSelf: 'flex-end',
							alignItems: 'center'
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text
							style={{
								fontSize: 18,
								marginBottom: 10,
								color: 'white'
							}}
						>
							{' '}
							Flip{' '}
						</Text>
					</TouchableOpacity>
					<Button title='Take Photo' onPress={takePhoto}></Button>
				</View>
			</Camera>
		</View>
	);
}
