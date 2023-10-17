import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet } from 'react-native';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
	const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
	const [value, setValue] = React.useState(pathname);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box style={styles.container}>
			<Paper
				sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
				elevation={3}>
				<BottomNavigation
					value={value}
					onChange={handleChange}
					showLabels={true}>
					<BottomNavigationAction
						label='Home'
						value='/'
						icon={<FavoriteIcon />}
						component={Link}
						to='/'
					/>

					<BottomNavigationAction
						label='Login'
						value='/login'
						icon={<PublicIcon />}
						component={Link}
						to='/login'
					/>

					<BottomNavigationAction
						label='Search'
						value='/search'
						icon={<FormatListBulletedIcon />}
						component={Link}
						to='/search'
					/>
					<BottomNavigationAction
						label='Profile'
						value='/profile'
						icon={<PersonIcon />}
						component={Link}
						to='/'
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100vw',
	},
});

export default Navbar;

/*<Pressable style={styles.button}>
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

			*/
