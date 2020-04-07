import React from 'react';
import {
	View,
	Text,
	Dimensions,
	ScrollView,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	Button
} from 'react-native';
import Clothes from '../Clothes/Clothes';
import CameraModal from '../CameraModal/CameraModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ClothesMenu extends React.Component {
	state = {
		loaded: false,
		isCameraModalVisible: false,
		clothes: []
	};
	componentDidMount() {
		this.fetchImages();
	}

	fetchImages = async () => {
		// await Image.prefetch(
		// );
		await this.setState({ loaded: true });
	};
	renderClothes = () => {
		let clotheslist = [];
		for (let i = 0; i < 3; i++) {
			clotheslist.push(
				<View
					key={i}
					style={{
						borderBottomColor: '#CCC',
						borderBottomWidth: 0.5,
						height: Dimensions.get('window').height / 8
					}}
				>
					<Clothes />
				</View>
			);
		}
		return clotheslist;
	};

	toggleCameraModal = value => {
		this.setState({ isCameraModalVisible: value });
	};

	takePicture = value => {};

	render() {
		if (this.state.loaded !== true)
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#CCC" />
				</View>
			);
		return (
			<View style={{ flex: 1 }}>
				<CameraModal
					visible={this.state.isCameraModalVisible}
					toggle={this.toggleCameraModal}
					takePicture={this.takePicture}
				/>
				<ScrollView>
					<View>{this.renderClothes()}</View>
				</ScrollView>
				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 10,
						left: Dimensions.get('window').width / 2 - 25,
						zIndex: 1
					}}
				>
					<Icon
						style={{
							borderWidth: 1,
							borderRadius: 20,
							borderColor: '#CCC'
						}}
						size={50}
						name="add"
						color="#CCC"
					></Icon>
				</TouchableOpacity>
			</View>
		);
	}
}
