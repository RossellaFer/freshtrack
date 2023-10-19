import './App.css';
import React, { useState, createContext, useContext } from 'react';
import Home from './pages/Home';
import Root from './components/Root.js';
import Search from './pages/Search.js';
import CreateNew from './pages/CreateNew.js';
import Impact from './pages/Impact.js';
import Discover from './pages/Discover.js';
import Scanner from './pages/Scanner.js';
import Profile from './pages/Profile.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './contexts/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/useAuth';
import Login from './contexts/Login';
import Navbar from './components/Navbar';
import Register from './contexts/Register';
// const AuthContext = createContext();
// export const AuthData = () => useContext(AuthContext);

function App() {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<>
			<AuthProvider>
				<Router>
					{/* <AuthContext.Provider value={{ isAuthenticated }}> */}

					<Routes>
						<Route
							path='/'
							element={<Root />}>
							<Route
								index
								element={<Home />}
							/>
							<Route
								path='/home'
								element={<Home />}
							/>

							<Route
								path='/login'
								element={<Login />}
							/>
							<Route
								path='/register'
								element={<Register />}
							/>

							<Route
								path='/impact'
								element={
									<ProtectedRoute>
										<Impact />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/lists'
								element={
									<ProtectedRoute>
										<Search />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/profile'
								element={<Profile />}
							/>
							<Route
								path='/createnew'
								element={
									<ProtectedRoute>
										<CreateNew />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/scanner'
								element={
									<ProtectedRoute>
										<Scanner />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/discover'
								element={
									<ProtectedRoute>
										<Discover />
									</ProtectedRoute>
								}
							/>
						</Route>
					</Routes>
					{/* </AuthContext.Provider> */}
				</Router>
			</AuthProvider>
		</>
	);
}

// export { App, AuthContext };
export default App;
