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

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

function App() {
  
	return (
	  <Router>
		<AuthContext.Provider>
		  <Routes>
			<Route
			  path="/"
			  element={<Root />}
			>
			  <Route index element={<Home />} />
			  <Route path='/impact' element={<Impact />}/>
			  <Route path="/lists" element={<Search />} />
			  <Route path="/profile" element={<Profile />} />
			  <Route path='/createnew' element={<CreateNew />}/>
			  <Route path='/scanner' element={<Scanner />}/>
			  <Route path='/discover' element={<Discover />}/>
			</Route>
		  </Routes>
		</AuthContext.Provider>
	  </Router>
	);
  }
  
  export { App, AuthContext };