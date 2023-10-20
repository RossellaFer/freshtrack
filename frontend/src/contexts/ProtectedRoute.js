// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

// We are taking in the component that should be rendered if the user is authed
// We are also passing the rest of the props to the <Route /> component such as
// exact & the path
const ProtectedRoute = ({ children }) => {
	// Getting the value from our cool custom hook
	const { authed } = useAuth();
	console.log('Autho' + authed);

	return authed ? (
		children
	) : (
		<Navigate
			to='/signInOrRegister'
			replace
		/>
	);
};

export default ProtectedRoute;
