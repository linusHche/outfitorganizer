import React, { useState } from 'react';
import { TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import styles from './RegisterStyles';
import { API_ADDRESS } from '../../constants';

export default Register = ({ navigation }) => {
	const [state, setState] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	});

	const validateInputs = () => {
		const { username, password, confirmPassword } = state;
		let msg = null;
		if (username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0)
			msg = 'Spaces are not allowed in any fields';

		if (username === '' || password === '' || confirmPassword === '') msg = 'At least one of the fields is empty';
		if (password !== confirmPassword) msg = 'Passwords do not match';
		return msg;
	};

	const processRegister = async () => {
		const { username, password } = state;
		const msg = validateInputs();
		if (msg) {
			alert(msg);
			return;
		}
		const response = await fetch(`${API_ADDRESS}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(state),
		});
		const value = await response.json();
		await AsyncStorage.setItem('@token', value.token);
		await AsyncStorage.setItem('@currentUser', value.user);
		navigation.navigate('Main');
	};

	const handleChange = async (value) => {
		const f = await AsyncStorage.getItem('@token');
		alert(f);
		setState((prev) => ({ ...prev, ...value }));
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1, marginTop: '25%' }}>
				<TextInput
					autoCapitalize='none'
					keyboardAppearance={'dark'}
					placeholder='Username'
					style={styles.textbox}
					onChangeText={(text) => handleChange({ username: text })}
				></TextInput>
				<TextInput
					secureTextEntry={true}
					keyboardAppearance={'dark'}
					placeholder='Password'
					style={styles.textbox}
					onChangeText={(text) => handleChange({ password: text })}
				></TextInput>
				<TextInput
					secureTextEntry={true}
					keyboardAppearance={'dark'}
					placeholder='Confirm Password'
					style={styles.textbox}
					onChangeText={(text) => handleChange({ confirmPassword: text })}
				></TextInput>
				<TouchableOpacity style={styles.button} title='Press' onPress={processRegister}>
					<View style={{ borderWidth: '1', flex: 1 }}>
						<Text style={styles.text}>Register</Text>
					</View>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};
