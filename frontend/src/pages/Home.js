import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Pressable,
	Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = () => {
	//const { authed, loading } = useAuth();
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			{/* {authed ? <Logout /> : <Login />}
			<div style={{ margin: '20px' }}>
				<span>Auth Status: {authed ? 'Logged In' : 'Not Logged In'}</span>
			</div> */}

			<View>
				<Text style={styles.heading}>Fresh Track</Text>
				<Text style={styles.subheading}>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</Text>
			</View>

			<Image
				style={styles.image}
				source={require('../assets/placeholder.png')}
			/>
			 <Pressable
				
				style={buttonStyles.button}>
					<Link to='/signInOrRegister'>
					<Text style={buttonStyles.text}>{t('button')}</Text>
					</Link>
				
			</Pressable> 
			
		</View>
	);
};

export default Home;

let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: ScreenHeight,
		margin: 'auto',
		padding: 30,
	},
	heading: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 60,
		textAlign: 'center',
	},
	subheading: {
		fontSize: 14,
		fontWeight: 600,
		marginBottom: 20,
		textAlign: 'center',
	},
	image: {
		width: '100%',
		height: 300,
		marginBottom: 10,
		marginTop: 10,
	},
});

const buttonStyles = StyleSheet.create({
	button: {
		backgroundColor: '#000',
		borderRadius: 100,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 24,
		paddingRight: 24,
		marginTop: 20,
	},
	text: {
	textDecoration: 'none',
		color: '#fff',
		fontWeight: '500',
		lineHeight: 21,
		letterSpacing: 0.25,
		textAlign: 'center',
	},
});
