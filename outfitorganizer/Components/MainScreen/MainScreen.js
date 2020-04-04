import React from 'react';
import { Platform } from 'react-native';
import OutfitMenu from '../OutfitMenu/OutfitMenu';
import ClothesMenu from '../ClothesMenu/ClothesMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Drawer = createBottomTabNavigator();

export default class MainScreen extends React.Component {
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
			<NavigationContainer independent={true}>
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
	}
}
