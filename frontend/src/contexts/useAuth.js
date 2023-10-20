import React, { useState, createContext, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	// const sessionStorageValue = JSON.parse(sessionStorage.getItem("loggedIn"));
	// const [authed, setAuthed] = useState<boolean>(sessionStorageValue);
	const [authed, setAuthed] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({
		id: '',
		points: '',
		language: '',
	});

	console.log('authed: ' + authed);
	useEffect(() => {
		if (!authed) {
			fakeAsyncLoginCheck().then((activeUser) => {
				if (activeUser) {
					console.log('fake async login check called');
					setUser({
						id: '1234',
						points: 50,
						language: '1',
					});

					setAuthed(true);
					setLoading(false);
				} else {
					setLoading(false);
					emptyUser();
				}
			});
		}
	}, []);

	function emptyUser() {
		setUser({
			id: '',
			points: '',
			language: '',
		});
	}

	const createUser = async (creds) => {
		const result = await fakeAsyncCreateUser(creds);

		if (result) {
			console.log('user has been created');
			//TODO: DO WE NEED TO LOG THEM IN HERE?
			setAuthed(true);
			// sessionStorage.setItem("loggedIn", "true");
		}
	};

	const login = async (creds) => {
		const result = await fakeAsyncLogin(creds);

		if (result) {
			console.log('user has logged in');

			setAuthed(true);
			// sessionStorage.setItem("loggedIn", "true");
		}
	};

	const logout = async () => {
		const result = await fakeAsyncLogout();

		if (result) {
			console.log('The User has logged out');
			setAuthed(false);
			// sessionStorage.setItem("loggedIn", "false");
		}
	};

	/// Mock Async Create User API call.
	// TODO: Replace with your actual Create User API Call code
	const fakeAsyncCreateUser = async (data) => {
		//console.log('LOGIN APICALL:' + data.email + '***' + data.password);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Created User');
			}, 300);
		});
	};

	/// Mock Async Login API call.
	// TODO: Replace with your actual login API Call code
	const fakeAsyncLogin = async (data) => {
		//console.log('LOGIN APICALL:' + data.email + '***' + data.password);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Logged In');
			}, 300);
		});
	};

	// Fixes the reload issue
	const fakeAsyncLoginCheck = async () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 300);
		});
	};

	// Mock Async Logout API call.
	// TODO: Replace with your actual logout API Call code
	const fakeAsyncLogout = async () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('The user has successfully logged out the server');
			}, 300);
		});
	};

	return (
		// Using the provider so that ANY component in our application can
		// use the values that we are sending.
		<AuthContext.Provider
			value={{ authed, setAuthed, login, logout, createUser, loading, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
