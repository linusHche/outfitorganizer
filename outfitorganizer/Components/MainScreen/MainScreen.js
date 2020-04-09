import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import OutfitMenu from '../OutfitMenu/OutfitMenu';
import ClothesMenu from '../ClothesMenu/ClothesMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Drawer = createBottomTabNavigator();
import { Dropbox } from 'dropbox';
var dbx = null;
export default class MainScreen extends React.Component {
	state = {
		isCameraModalVisible: false,
	};

	componentDidMount() {
		this.initializeDropbox();
	}

	initializeDropbox = async () => {
		const accessToken = await AsyncStorage.getItem('@dropbox_token');
		dbx = new Dropbox({
			accessToken: AsyncStorage.getItem('@dropbox_token'),
			fetch,
		});
	};

	iconPlatformName = (name) => {
		return `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`;
	};

	setCameraModalVisible = (value) => {
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
							),
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
							),
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		);
	}
}
