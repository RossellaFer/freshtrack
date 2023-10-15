import './App.css';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Root from './components/Root.js';
import Search from './components/Search.js';

// Add react-router-dom imports
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

// create router with JSX Route elements
const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Root />}>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/search'
				element={<Search />}
			/>
		</Route>
	)
);

function App() {
	return <RouterProvider router={appRouter} />;
}

export default App;
