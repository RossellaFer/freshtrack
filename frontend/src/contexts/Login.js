// Login.tsx
import React from 'react';
import { useAuth } from './useAuth';

function Login() {
	// Destructing our hook to get the `login` function
	const { login } = useAuth();

	return (
		<div>
			<h1> LOGIN</h1>
			<button onClick={login}>Login</button>
		</div>
	);
}

export default Login;
