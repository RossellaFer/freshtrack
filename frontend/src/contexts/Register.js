import React, { useState } from 'react';
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
import Terms from '../components/Terms';
import { useTranslation } from 'react-i18next';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
	const { t } = useTranslation();
	const [termsOpen, setTermsOpen] = useState(false);

	const [checkEmail, setCheckEmail] = useState(false);
	const [passDiff, setPassDiff] = useState(false);

	//Result of message
	const [result, setResult] = useState('');

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
		repeatpassword: '',
	});
	console.log('pass1: ' + credentials.password);
	console.log('pass2: ' + credentials.repeatpassword);
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
			setResult('Uh oh! Please Write Valid Email');
		}

		setCredentialsChange(event);
	}
	// function handlePassChange(event) {
	// 	setPassDiff(false);
	// 	setResult('');
	// 	//compare that repeatpassword is the same as password
	// 	if (credentials.repeatpassword !== credentials.password) {
	// 		setPassDiff(true);
	// 		setResult("Uh oh! Passwords Don't Match!");
	// 	}

	// 	setCredentialsChange(event);
	// }

	function setCredentialsChange(event) {
		setCredentials((prevCredentialsData) => {
			return {
				...prevCredentialsData,
				[event.target.name]: event.target.value,
			};
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setResult('');
		const data = new FormData(event.currentTarget);
		if (credentials.repeatpassword !== credentials.password) {
			setPassDiff(true);
			setResult("Uh oh! Passwords Don't Match!");
		} else {
			setPassDiff(false);
			setResult('');
		}
		console.log('checkemail: ' + checkEmail);
		console.log('passDiff' + passDiff);
		if (
			credentials.repeatpassword !== '' &&
			credentials.password !== '' &&
			credentials.email !== '' &&
			checkEmail === false &&
			passDiff === false
		) {
			console.log(
				'SUCCESS' +
					{
						email: data.get('email'),
						password: data.get('password'),
					}
			);

			//login(credentials);
			resetCredentials();
		} else {
			setResult('Requires Password and Valid Email');
		}
	}

	const handleOpenTerms = () => {
		setTermsOpen(true);
	};
	const handleCloseTerms = () => {
		setTermsOpen(false);
	};

	return (
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
					<Text style={styles.heading}>{t('freshtrack')}</Text>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									error={checkEmail}
									onChange={handleEmailChange}
								/>
							</Grid>
							<Grid
								item
								xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									error={passDiff}
									onChange={setCredentialsChange}
									autoComplete='new-password'
								/>
							</Grid>
							<Grid
								item
								xs={12}>
								<TextField
									required
									fullWidth
									name='repeatpassword'
									label='Repeat Password'
									type='password'
									id='repeatpassword'
									error={passDiff}
									onChange={setCredentialsChange}
									autoComplete='new-password'
								/>
							</Grid>
							<Grid
								item
								xs={12}>
								<Text style={styles.resultText}>{result}</Text>
							</Grid>
							<Grid item>
								<Button
									size='large'
									variant='text'
									onClick={handleOpenTerms}>
									Read Terms & Conditions
								</Button>
							</Grid>

							<Grid
								item
								xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											value='allowExtraEmails'
											color='primary'
										/>
									}
									label='I Accept Terms & Conditions'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Register
						</Button>
						<Grid
							container
							justifyContent='flex-end'>
							<Grid item>
								<Link
									href='/login'
									variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>

			<Terms
				open={termsOpen}
				handleCloseTerms={handleCloseTerms}
			/>
		</ThemeProvider>
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
