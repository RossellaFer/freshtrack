// Login.tsx
import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
	const { authed, loading } = useAuth();

	const [checkEmail, setCheckEmail] = useState(false);

	//Result of message
	const [result, setResult] = useState('');
	const { login } = useAuth();

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	function resetCredentials() {
		setCredentials({ email: '', password: '' });
	}

	function handleEmailChange(event) {
		var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (reg.test(event.target.value) === true) {
			//valid email
			setCheckEmail(false);
			setResult('');
		} else {
			//invalid email
			setCheckEmail(true);
			setResult('Uh oh! Please Write valid email');
		}

		setCredentialsChange(event);
	}

	function setCredentialsChange(event) {
		setCredentials((prevCredentialsData) => {
			return {
				...prevCredentialsData,
				[event.target.name]: event.target.value,
			};
		});
	}
	const handleSubmit = (event) => {
		// console.log({
		// 	email: data.get('email'),
		// 	password: data.get('password'),
		// });
		event.preventDefault();
		setResult('');

		const data = new FormData(event.currentTarget);

		if (
			credentials.password !== '' &&
			credentials.email !== '' &&
			checkEmail === false
		) {
			login(credentials);
			resetCredentials();
		} else {
			setResult('Requires Password and Valid Email');
		}
	};

	return (
		<>
			{authed ? (
				<Navigate
					to='/profile'
					replace
				/>
			) : (
				<ThemeProvider theme={defaultTheme}>
					<Container
						component='main'
						maxWidth='xs'>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<Text style={styles.heading}>Fresh Track</Text>
							<Box
								component='form'
								onSubmit={handleSubmit}
								noValidate
								sx={{ mt: 1 }}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									type='email'
									onChange={handleEmailChange}
									autoComplete='email'
									autoFocus
									error={checkEmail}
								/>
								<TextField
									margin='normal'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									onChange={setCredentialsChange}
									autoComplete='current-password'
								/>

								<Text style={styles.resultText}>{result}</Text>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2, backgroundColor: 'var(--accent-1)' }}>
									Sign In
								</Button>

								<Grid container>
									<Grid item>
										<Link
											href='/register'
											variant='body2'>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 40,
		fontWeight: 'bold',
		color: 'var(--basic)',
		marginBottom: 60,
		textAlign: 'center',
	},
	resultText: {
		color: 'var(--error)',
	},
});

// function Login() {
// 	// Destructing our hook to get the `login` function
// 	const { login } = useAuth();

// 	return (
// 		<View style={styles.container}>
// 			<h1> LOGIN</h1>
// 			<input placeholder='Email'></input>
// 			<input placeholder='Password'></input>
// 			<button onClick={login}>Login</button>
// 		</View>
// 	);
// }
// const styles = StyleSheet.create({
// 	container: {
// 		display: 'flex',
// 		flex: 1,
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// });
// export default Login;
