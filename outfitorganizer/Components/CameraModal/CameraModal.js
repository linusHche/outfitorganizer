import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import OutfitCamera from '../OutfitCamera/OutfitCamera';

export default class CameraModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCameraModalVisible: false
		};
	}
	componentDidMount() {
		this.setState({ isCameraModalVisible: this.props.visible });
	}
	setCameraModalVisible = value => {
		this.setState({ isCameraModalVisible: value });
	};
	render() {
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.isCameraModalVisible}
				>
					<View
						style={{
							backgroundColor: 'white',
							margin: 22,
							flex: 1,
							borderColor: 'black',
							borderWidth: 2,
							borderRadius: 20
						}}
					>
						<View>
							<TouchableOpacity
								onPress={() => {
									this.setCameraModalVisible(
										!this.state.isCameraModalVisible
									);
								}}
							>
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
						</View>
						<OutfitCamera />
					</View>
				</Modal>
			</View>
		);
	}
}
