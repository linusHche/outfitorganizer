import React from 'react';
import { Modal, Text, View, TouchableOpacity, Platform } from 'react-native';
import MainScreen from './Components/MainScreen/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
const Stack = createStackNavigator();
export default class App extends React.Component {
	state = {};
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerShown: false
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
