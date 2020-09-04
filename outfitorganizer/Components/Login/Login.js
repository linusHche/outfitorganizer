import React from 'react';
import { TouchableOpacity, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import styles from './LoginStyles';
import { API_ADDRESS } from '../../constants';
import { connect } from 'react-redux';
import { inputPassword, inputUsername } from '../../Actions/accountActions';

class Login extends React.Component {
	validateInputs = () => {
		const { username, password } = this.props;
		if (username === '' || password === '') {
			return 'At least one of the fields is empty';
		}
		return null;
	};

	processLogin = async () => {
		const { username, password, navigation } = this.props;
		const msg = this.validateInputs();
		if (msg) {
			alert(msg);
			return;
		}
		const response = await fetch(`${API_ADDRESS}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
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

	render() {
		const { inputUsername, inputPassword, navigation } = this.props;
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>Outfit Organizer</Text>
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
					<TouchableOpacity style={styles.button} title='Press' onPress={this.processLogin}>
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
}

const mapStateToProps = (state) => ({
	username: state.account.username,
	password: state.account.password,
});

const mapDispatchToProps = (dispatch) => ({
	inputUsername: (username) => dispatch(inputUsername(username)),
	inputPassword: (password) => dispatch(inputPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
