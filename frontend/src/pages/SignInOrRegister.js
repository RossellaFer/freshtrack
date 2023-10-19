import React from 'react';
import { Link } from 'react-router-dom';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Image,
	Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

const SignInOrRegister = () => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{t('freshtrack')}</Text>
			<Text style={styles.subheading}>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry.
			</Text>
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
					<Text style={buttonStyles.stext}>{t('signInButton')}</Text>
				</Button>
				<Button
					label='Register'
					value='/register'
					component={Link}
					to='/register'
					style={buttonStyles.rbutton}>
					<Text style={buttonStyles.rtext}>{t('registerButton')}</Text>
				</Button>
			</View>
		</View>
	);
};
let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
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
		fontWeight: 'bold',
	},
	image: {
		width: '10vh',
		height: '10vh',
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
	},
	rtext: {
		color: 'var(--basic-w)',
		fontWeight: '500',
		lineHeight: 21,
		letterSpacing: 0.25,
		textAlign: 'center',
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
	},
	stext: {
		color: 'var(--basic)',
		fontWeight: '500',
		lineHeight: 21,
		letterSpacing: 0.25,
		textAlign: 'center',
	},
});
export default SignInOrRegister;
