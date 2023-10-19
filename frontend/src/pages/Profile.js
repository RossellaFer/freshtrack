import React from 'react';
import Language from '../components/Language';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/useAuth';
import Logout from '../contexts/Logout';
import Login from '../contexts/Login';

const Profile = () => {
	const { authed, loading } = useAuth();
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<h1>{t('profile')}</h1>
			<Language />
			{/* <button>{t('logout')}</button> */}
			{authed ? <Logout /> : <Login />}
			<div style={{ margin: '20px' }}>
				{/* <span>Auth Status: {authed ? 'Logged In' : 'Not Logged In'}</span> */}
			</div>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
});
