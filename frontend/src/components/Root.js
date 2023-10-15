import React from 'react';
import { Outlet } from 'react-router-dom';
import { StyleSheet, View, Dimensions } from 'react-native';
import Navbar from '../components/Navbar';

const Root = () => {
	return (
		<View style={styles.container}>
			<Outlet />
			<Navbar />
		</View>
	);
};

export default Root;

let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height: ScreenHeight,
	},
});
