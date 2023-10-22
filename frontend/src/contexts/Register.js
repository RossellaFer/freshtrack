import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Terms from '../components/Terms';
import { useTranslation } from 'react-i18next';
import { useAuth } from './useAuth';
import Language from '../components/Language';

const defaultTheme = createTheme();

export default function Register() {
	const { t } = useTranslation();
	const { createUser, authed } = useAuth();

	const [termsOpen, setTermsOpen] = useState(false);

	const [checkEmail, setCheckEmail] = useState(false);

	//Result of message
	const [result, setResult] = useState('');

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
		repeatpassword: '',
		username: '',
	});

	function resetCredentials() {
		setCredentials({ email: '', password: '', username: '' });
	}

	function handleEmailChange(event) {
		var reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
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

	function setCredentialsChange(event) {
		setCredentials((prevCredentialsData) => {
			return {
				...prevCredentialsData,
				[event.target.name]: event.target.value,
			};
		});
	}

	function checkPasswords() {
		let answer = false;
		if (credentials.repeatpassword === credentials.password) {
			setResult('');
		} else {
			answer = true;
			setResult("Uh oh! Passwords Don't Match!");
		}
		return answer;
	}
	function handleSubmit(event) {
		event.preventDefault();
		setResult('');

		const data = new FormData(event.currentTarget);
		console.log(data)

		let passCheck = checkPasswords();


		if (
			credentials.repeatpassword !== '' &&
			credentials.username !== '' &&
			credentials.password !== '' &&
			credentials.email !== '' &&
			passCheck === false
		) {
			console.log(
				'SUCCESS' +
					{
						email: data.get('email'),
						password: data.get('password'),
						username: data.get('username')
					}
			);

			createUser(credentials);
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
		<>
			{authed ? (
				<Navigate
					to='/registersuccess'
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
							<Text style={styles.heading}>{t('register')}</Text>
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
											label={t('emailaddress')}
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
											id='username'
											label={t('username')}
											name='username'
											onChange={setCredentialsChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}>
										<TextField
											required
											fullWidth
											name='password'
											label={t('password')}
											type='password'
											id='password'
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
											label={t('repeatpassword')}
											type='password'
											id='repeatpassword'
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
											{t('termscond')}
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
											label={t('termsagree')}
										/>
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2, backgroundColor: 'var(--accent-1)' }}>
									{t("confirmRegistration")}
								</Button>
								<Grid
									container
									justifyContent='flex-end'>
									<Grid item>
										<Link style={{ textAlign: 'center' }}
											href='/login'
											variant='body2'>
											{t('haveAccountLink')}
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
					<Language isProfilePage={false} />
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
		marginBottom: 40,
		textAlign: 'center',
	},
	resultText: {
		color: 'var(--error)',
	},
});
