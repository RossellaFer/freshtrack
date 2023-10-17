import './App.css';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Root from './components/Root.js';
import Search from './pages/Search.js';
import CreateNew from './pages/CreateNew.js';
import Scanner from './pages/Scanner.js';
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
			<Route
				path='/createnew'
				element={<CreateNew />}
			/>
			<Route
				path='/scanner'
				element={<Scanner />}
			/>
		</Route>
	)
);

function App() {
	return <RouterProvider router={appRouter} />;
}

export default App;
