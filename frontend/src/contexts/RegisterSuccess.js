import React from 'react';
import { Link } from 'react-router-dom';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Image,
	StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

const RegisterSuccess = () => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{t('freshtrack')}</Text>
			<Image
				style={styles.image}
				source={require('../assets/placeholder.png')}
			/>
			<Text style={styles.subheading}>{t('register_success')}</Text>
			<Button
				label='Get Started'
				value='/'
				component={Link}
				to='/'
				style={buttonStyles.rbutton}>
				{t('getstarted')}
			</Button>
		</View>
	);
};

let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'var(--basic-w)',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: ScreenHeight,

		padding: 30,
		marginBottom: StatusBar.currentHeight,
	},
	heading: {
		fontSize: 40,
		fontWeight: 'bold',
		color: 'var(--basic)',
		marginBottom: 60,
		textAlign: 'center',
	},
	subheading: {
		fontWeight: 'bold',
		fontSize: '1.3rem',
		textAlign: 'center',
		width: '80%',
	},
	image: {
		width: '20vh',
		height: '20vh',
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
});

export default RegisterSuccess;
