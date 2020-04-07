import React, { useState } from 'react';
import {
	TouchableOpacity,
	Text,
	View,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback
} from 'react-native';

export default function Login({ navigation }) {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1 }}>
				<Text
					style={{
						fontFamily: 'American Typewriter',
						fontSize: 30,
						textAlign: 'center',
						marginVertical: '20%'
					}}
				>
					Outfit Organizer
				</Text>
				<TextInput
					keyboardAppearance={'dark'}
					placeholder="Username"
					style={{
						fontFamily: 'American Typewriter',
						fontSize: 20,
						height: 50,
						borderColor: '#CCC',
						borderWidth: 1,
						marginVertical: '5%',
						marginHorizontal: 5,
						borderRadius: 20
					}}
				></TextInput>
				<TextInput
					keyboardAppearance={'dark'}
					placeholder="Password"
					style={{
						fontFamily: 'American Typewriter',
						fontSize: 20,
						height: 50,
						borderColor: '#CCC',
						borderWidth: 1,
						marginVertical: '5%',
						marginHorizontal: 5,
						borderRadius: 20
					}}
				></TextInput>
				<TouchableOpacity
					style={{ width: '50%', left: '25%', height: '5%' }}
					title="Press"
					onPress={() => navigation.navigate('Main')}
				>
					<View style={{ borderWidth: '1', flex: 1 }}>
						<Text
							style={{
								fontFamily: 'American Typewriter',
								fontSize: 20,
								textAlign: 'center'
							}}
						>
							Login
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: '50%',
						left: '25%',
						height: '5%',
						marginTop: 20
					}}
					title="Press"
					onPress={() => navigation.navigate('Register')}
				>
					<View style={{ borderWidth: '1', flex: 1 }}>
						<Text
							style={{
								fontFamily: 'American Typewriter',
								fontSize: 20,
								textAlign: 'center'
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
