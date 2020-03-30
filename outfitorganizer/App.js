import React from 'react';
import { Modal, Text, View, TouchableOpacity, Platform } from 'react-native';
import OutfitCamera from './Components/OutfitCamera/OutfitCamera';
import CameraModal from './Components/CameraModal/CameraModal';
import OutfitMenu from './Components/OutfitMenu/OutfitMenu';
import ClothesMenu from './Components/ClothesMenu/ClothesMenu';
import OutfitGenerator from './Components/OutfitGenerator/OutfitGenerator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Drawer = createBottomTabNavigator();

export default class App extends React.Component {
	state = {
		isCameraModalVisible: false
	};

	iconPlatformName = name => {
		return `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`;
	};

	setCameraModalVisible = value => {
		this.setState({ isCameraModalVisible: value });
	};
	render() {
		return (
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen
						name="Outfits"
						component={OutfitMenu}
						options={{
							tabBarIcon: ({ color }) => (
								<Ionicons
									size={25}
									name={this.iconPlatformName('basket')}
									color={color}
								/>
							)
						}}
					/>
					<Drawer.Screen
						name="Clothes"
						component={ClothesMenu}
						options={{
							tabBarIcon: ({ color }) => (
								<Ionicons
									size={25}
									name={this.iconPlatformName('shirt')}
									color={color}
								/>
							)
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		);

		return (
			<View style={{ flex: 1 }}>
				<CameraModal visible={this.state.isCameraModalVisible} />
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						position: 'absolute',
						bottom: 20,
						borderColor: '#CCC',
						borderTopWidth: 1
					}}
				>
					<View style={{ flex: 1 }}>
						<TouchableOpacity>
							<Text
								style={{
									textAlign: 'center',
									textAlignVertical: 'center',
									fontSize: 25
								}}
							>
								Outfits
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => this.setCameraModalVisible(true)}
						>
							<Text style={{ textAlign: 'center', fontSize: 30 }}>
								+
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
