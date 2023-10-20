import React from 'react';
import { Link } from 'react-router-dom';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

const SignInOrRegister = () => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{t('freshtrack')}</Text>
			<Text style={styles.subheading}>{t('joinMission')}</Text>
			<Text style={styles.subheading}>{t('sign_register')}</Text>

			<Image
				style={styles.image}
				source={require('../assets/placeholder.png')}
			/>
			<View style={styles.buttonView}>
				<Button
					label='Sign In'
					value='/login'
					component={Link}
					to='/login'
					style={buttonStyles.sbutton}>
					{t('signInButton')}
				</Button>
				<Button
					label='Register'
					value='/register'
					component={Link}
					to='/register'
					style={buttonStyles.rbutton}>
					{t('registerButton')}
				</Button>
			</View>
		</View>
	);
};
let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		backgroundColor: 'var(--basic-w)',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: ScreenHeight,
		margin: 'auto',
		padding: 30,
	},
	heading: {
		fontSize: 40,
		fontWeight: 'bold',
		color: 'var(--basic)',
		marginBottom: 60,
		textAlign: 'center',
	},
	subheading: {
		fontSize: '1rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	image: {
		width: '20vh',
		height: '20vh',
		marginBottom: 5,
		marginTop: 5,
	},
	buttonView: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingBottom: '20vh',
	},
});

const buttonStyles = StyleSheet.create({
	rbutton: {
		backgroundColor: 'var(--basic)',
		borderRadius: 100,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 24,
		paddingRight: 24,
		marginTop: 20,
		color: 'var(--basic-w)',
	},

	sbutton: {
		backgroundColor: 'var(--basic-w)',
		borderRadius: 100,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 24,
		paddingRight: 24,
		marginTop: 20,
		border: '1px solid var(--basic)',
		color: 'var(--basic)',
	},
});
export default SignInOrRegister;
