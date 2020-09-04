import React, { useState } from 'react';
import { TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import styles from './RegisterStyles';
import { API_ADDRESS } from '../../constants';
import { connect } from 'react-redux';
import { inputConfirmPassword, inputPassword, inputUsername } from '../../Actions/accountActions';

class Register extends React.Component {
	validateInputs = () => {
		const { username, password, confirmPassword } = this.props;
		let msg = null;
		if (username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0)
			msg = 'Spaces are not allowed in any fields';

		if (username === '' || password === '' || confirmPassword === '') msg = 'At least one of the fields is empty';
		if (password !== confirmPassword) msg = 'Passwords do not match';
		return msg;
	};

	processRegister = async () => {
		const { username, password } = this.props;
		const msg = this.validateInputs();
		if (msg) {
			alert(msg);
			return;
		}
		const response = await fetch(`${API_ADDRESS}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
		const value = await response.json();
		await AsyncStorage.setItem('@token', value.token);
		await AsyncStorage.setItem('@currentUser', value.user);
		navigation.navigate('Main');
	};

	handleChange = async (value) => {
		const f = await AsyncStorage.getItem('@token');
		alert(f);
		setState((prev) => ({ ...prev, ...value }));
	};

	render() {
		const { inputConfirmPassword, inputPassword, inputUsername } = this.props;
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={{ flex: 1, marginTop: '25%' }}>
					<TextInput
						autoCapitalize='none'
						keyboardAppearance={'dark'}
						placeholder='Username'
						style={styles.textbox}
						onChangeText={(text) => inputUsername(text)}
					></TextInput>
					<TextInput
						secureTextEntry={true}
						keyboardAppearance={'dark'}
						placeholder='Password'
						style={styles.textbox}
						onChangeText={(text) => inputPassword(text)}
					></TextInput>
					<TextInput
						secureTextEntry={true}
						keyboardAppearance={'dark'}
						placeholder='Confirm Password'
						style={styles.textbox}
						onChangeText={(text) => inputConfirmPassword(text)}
					></TextInput>
					<TouchableOpacity style={styles.button} title='Press' onPress={this.processRegister}>
						<View style={{ borderWidth: '1', flex: 1 }}>
							<Text style={styles.text}>Register</Text>
						</View>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = (state) => ({
	...state.account,
});

const mapDispatchToProps = (dispatch) => ({
	inputUsername: (username) => dispatch(inputUsername(username)),
	inputPassword: (password) => dispatch(inputPassword(password)),
	inputConfirmPassword: (password) => dispatch(inputConfirmPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
