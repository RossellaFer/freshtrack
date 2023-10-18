import React from 'react';
import Language from '../components/Language';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';

const Profile = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <h1>{t('profile')}</h1>
            <Language />
            <button>{t('logout')}</button>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	}
});