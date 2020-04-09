import React from 'react';
import { AsyncStorage } from 'react-native';
import MainScreen from './Components/MainScreen/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
const Stack = createStackNavigator();
export default class App extends React.Component {
	async componentDidMount() {
		const keys = await AsyncStorage.getAllKeys();
		if (keys.length > 0) {
			await AsyncStorage.clear();
		}
	}
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerShown: false,
						gestureEnabled: false,
					}}
				>
					<Stack.Screen name="Login" component={Login}></Stack.Screen>
					<Stack.Screen
						name="Register"
						component={Register}
					></Stack.Screen>
					<Stack.Screen
						name="Main"
						component={MainScreen}
					></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
