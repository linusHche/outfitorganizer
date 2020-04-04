import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { API_ADDRESS, DROPBOX_ACCESS_TOKEN } from '../../constants';
import { View, Button, Platform, Image } from 'react-native';
import { Dropbox } from 'dropbox';
const dbx = new Dropbox({
	accessToken: DROPBOX_ACCESS_TOKEN,
	fetch
});

export default function OutfitCamera() {
	const [url, setUrl] = useState();
	const [camera, setCamera] = useState(null);
	useEffect(async () => {
		await Camera.requestPermissionsAsync();
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
			const photo = await dbx.filesUpload({
				path: '/testfolder/test-image.jpg',
				contents
			});
			console.log(photo);
			const response = await fetch(`${API_ADDRESS}/upload`);
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
				ref={ref => {
					setCamera(ref);
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row'
					}}
				></View>
			</Camera>
			<Button onPress={takePhoto} title="Take Photo"></Button>
		</View>
	);
}
