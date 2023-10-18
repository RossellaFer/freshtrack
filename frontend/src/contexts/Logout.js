// Logout.tsx
import React from 'react';
import { useAuth } from './useAuth';

function Logout() {
	// Destructing our hook to get the `logout` function
	const { logout } = useAuth();

	return <button onClick={logout}>Logout</button>;
}

export default Logout;
