import React from 'react';
import {
	View,
	Text,
	Dimensions,
	ScrollView,
	Image,
	ActivityIndicator
} from 'react-native';
import Clothes from '../Clothes/Clothes';
import OutfitCamera from '../OutfitCamera/OutfitCamera';

export default class ClothesMenu extends React.Component {
	state = {
		loaded: false
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
	render() {
		if (this.state.loaded !== true)
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#CCC" />
				</View>
			);
		return (
			<View>
				<ScrollView>
					<View>{this.renderClothes()}</View>
				</ScrollView>
				<View style={{ position: 'absolute' }}></View>
			</View>
		);
	}
}
