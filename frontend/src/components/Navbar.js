import React from 'react';
import { Link } from 'react-router-dom';
import { Pressable, StyleSheet, View } from 'react-native';

const Navbar = () => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.button}>
				<Link to='/'>Home</Link>
			</Pressable>
			<Pressable style={styles.button}>
				<Link to='/login'>Login</Link>
			</Pressable>
			<Pressable style={styles.button}>
				<Link to='/search'>Search</Link>
			</Pressable>

			<Pressable style={styles.button}>
				<Link to='/'>Profile</Link>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',

		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'lightgray',
	},
	button: {
		height: 40,
		width: '5vw',

		borderWidth: 1,
		padding: 10,

		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Navbar;
