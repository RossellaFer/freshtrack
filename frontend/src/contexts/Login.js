import React, { useState } from 'react';
import Language from '../components/Language';
import { useAuth } from './useAuth';
import { StyleSheet, Text } from 'react-native';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const defaultTheme = createTheme();

export default function Login() {
	const { t } = useTranslation();
	const { authed } = useAuth();

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
		//const data = new FormData(event.currentTarget);
		// console.log({
		// 	email: data.get('email'),
		// 	password: data.get('password'),
		// });
		event.preventDefault();
		setResult('');

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
					to='/lists'
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
							<Text style={styles.heading}>{t('login')}</Text>
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
									label={t('emailaddress')}
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
									label={t('password')}
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
									{t('signInButton')}
								</Button>

								<Grid container>
									<Grid item>
										<Link
											href='/register'
											variant='body2'>
											{t('NoAccountLink')}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Language isProfilePage={false} />
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
