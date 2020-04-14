import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import styles from './LoginStyles';
import { API_ADDRESS } from '../../constants';

export default function Login({ navigation }) {
	const [state, setState] = useState({
		username: '',
		password: '',
	});
	const validateInputs = () => {
		const { username, password } = state;
		if (username === '' || password === '') {
			return 'At least one of the fields is empty';
		}
		return null;
	};

	const handleChange = (value) => {
		setState((prev) => ({ ...prev, ...value }));
	};

	const processLogin = async () => {
		const msg = validateInputs();
		if (msg) {
			alert(msg);
			return;
		}
		const response = await fetch(`${API_ADDRESS}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(state),
		});
		const value = await response.json();
		if (response.status !== 200) {
			alert(value.msg);
			return;
		}
		await AsyncStorage.setItem('@token', value.token);
		await AsyncStorage.setItem('@currentUser', value.user.username);
		navigation.navigate('Main');
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>Outfit Organizer</Text>
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
				<TouchableOpacity style={styles.button} title='Press' onPress={processLogin}>
					<View style={{ borderWidth: '1', flex: 1 }}>
						<Text style={styles.text}>Login</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { marginTop: 20 }]} title='Press' onPress={() => navigation.navigate('Register')}>
					<View style={{ borderWidth: '1', flex: 1 }}>
						<Text
							style={{
								fontFamily: 'American Typewriter',
								fontSize: 20,
								textAlign: 'center',
							}}
						>
							Register
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}
