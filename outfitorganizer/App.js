import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Button,
	Platform,
	Image
} from 'react-native';
import { Camera } from 'expo-camera';
import { API_ADDRESS, DROPBOX_ACCESS_TOKEN } from './constants';
import { Dropbox } from 'dropbox';
const dbx = new Dropbox({
	accessToken: DROPBOX_ACCESS_TOKEN,
	fetch
});

export default function App() {
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [url, setUrl] = useState();
	let camera = null;
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
		})();
	}, []);
	const takePhoto = async () => {
		if (camera)
			var data = await camera.takePictureAsync({
				quality: 0.5,
				base64: true
			});
		let contents = {
			uri:
				Platform.OS === 'ios'
					? data.uri.replace('file://', '')
					: data.uri,
			name: 'picture.jpg',
			type: 'image/jpg'
		};
		try {
			await dbx.filesUpload({
				path: '/testfolder/test-image.jpg',
				contents
			});
			const response = await fetch(`${API_ADDRESS}/api/upload`);
			let value = await response.json();
			setUrl(value.link);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Image
				style={{ width: 200, height: 200 }}
				source={{
					uri: url
				}}
			/>
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
					<Button title="Take Photo" onPress={takePhoto}></Button>
				</View>
			</Camera>
		</View>
	);
}
