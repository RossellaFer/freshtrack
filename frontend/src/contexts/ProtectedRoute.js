// ProtectedRoute.tsx
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
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
			to='/home'
			replace
		/>
	);

	// 	return (
	// 		<Route
	// 			{...rest}
	// 			render={(props) => {
	// 				if (authed) {
	// 					return (
	// 						<Outlet
	// 							{...rest}
	// 							{...props}
	// 						/>
	// 					);
	// 				} else {
	// 					// If they are not then we need to redirect to a public page
	// 					return (
	// 						<Navigate
	// 							to={{
	// 								pathname: '/home',
	// 								state: {
	// 									from: props.location,
	// 								},
	// 							}}
	// 						/>
	// 					);
	// 				}
	// 			}}
	// 		/>
	// 	);
};

export default ProtectedRoute;
