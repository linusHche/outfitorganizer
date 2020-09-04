import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './OutfitStyles';
import { connect } from 'react-redux';
class Outfit extends React.Component {
	getClothesImagePaths = () => {
		const { clothes, outfit } = this.props;
		return outfit.clothesIds.map((id) => {
			return clothes.filter((x) => x.id === id)[0].path;
		});
	};

	renderClothesImages = () => {
		const paths = this.getClothesImagePaths();
		return paths.map((path, index) => {
			return (
				<Image
					key={index}
					style={{
						width: '20%',
						height: '90%',
						borderRadius: 5,
						borderColor: 'black',
					}}
					source={{ uri: path }}
				/>
			);
		});
	};

	render() {
		const { onPressModal, outfit } = this.props;
		return (
			<TouchableOpacity
				style={styles.outfitEditButton}
				onPress={() => {
					onPressModal(outfit.id);
				}}>
				<View style={{ flex: 1, marginLeft: 10 }}>
					<Text>{outfit.name}</Text>
				</View>
				{this.renderClothesImages()}
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state) => ({
	clothes: state.clothes.clothes,
});

export default connect(mapStateToProps)(Outfit);
